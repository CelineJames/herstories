from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.models import BlogPost
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostOut, BlogListResponse
from app.dependencies import get_db

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("/", response_model=BlogListResponse)
def read_posts(
    skip: int = 0,
    limit: int = Query(default=10, le=50),
    category: str = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(BlogPost).filter(BlogPost.is_published == True)

    if category:
        query = query.filter(BlogPost.category == category)

    query = query.order_by(BlogPost.created_at.desc())
    total = query.count()
    posts = query.offset(skip).limit(limit).all()

    return {"total": total, "posts": posts}


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(BlogPost.category).filter(
        BlogPost.is_published == True,
        BlogPost.category != None
    ).distinct().all()
    return {"categories": [c[0] for c in categories if c[0]]}


@router.get("/{slug}", response_model=BlogPostOut)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(
        BlogPost.slug == slug,
        BlogPost.is_published == True
    ).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("/", response_model=BlogPostOut)
def create_post(post: BlogPostCreate, db: Session = Depends(get_db)):
    existing = db.query(BlogPost).filter(BlogPost.slug == post.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    db_post = BlogPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.patch("/{id}", response_model=BlogPostOut)
def update_post(id: int, post: BlogPostUpdate, db: Session = Depends(get_db)):
    db_post = db.query(BlogPost).filter(BlogPost.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    for field, value in post.dict(exclude_unset=True).items():
        setattr(db_post, field, value)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.delete("/{id}")
def delete_post(id: int, db: Session = Depends(get_db)):
    db_post = db.query(BlogPost).filter(BlogPost.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return {"message": "Post deleted"}