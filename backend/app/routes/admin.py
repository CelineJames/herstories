from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, require_admin
from app.models import Biography, ArchiveItem, BlogPost, Submission
from app.schemas.biography import BiographyCreate, BiographyOut
from app.schemas.archive import ArchiveItemCreate, ArchiveItemOut
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostOut
from app.schemas.submission import SubmissionOut
from typing import List
from slugify import slugify

router = APIRouter(prefix="/admin", tags=["admin"])


# ── Submissions ──────────────────────────────────────────

@router.get("/submissions", response_model=List[SubmissionOut])
def get_submissions(
    status: str = "pending",
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    return db.query(Submission).filter(
        Submission.status == status
    ).order_by(Submission.created_at.desc()).all()


@router.patch("/submissions/{id}/approve")
def approve_submission(
    id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    submission = db.query(Submission).filter(Submission.id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    submission.status = "approved"
    db.commit()
    return {"message": "Approved"}


@router.patch("/submissions/{id}/reject")
def reject_submission(
    id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    submission = db.query(Submission).filter(Submission.id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    submission.status = "rejected"
    db.commit()
    return {"message": "Rejected"}


# ── Biographies ──────────────────────────────────────────

@router.get("/biographies", response_model=List[BiographyOut])
def get_all_biographies(
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    return db.query(Biography).order_by(Biography.name).all()


@router.post("/biographies", response_model=BiographyOut)
def create_biography(
    bio: BiographyCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    data = bio.dict()
    if not data.get("slug"):
        data["slug"] = slugify(data["name"])
    db_bio = Biography(**data)
    db.add(db_bio)
    db.commit()
    db.refresh(db_bio)
    return db_bio


@router.patch("/biographies/{id}", response_model=BiographyOut)
def update_biography(
    id: int,
    bio: BiographyCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    db_bio = db.query(Biography).filter(Biography.id == id).first()
    if not db_bio:
        raise HTTPException(status_code=404, detail="Biography not found")
    for field, value in bio.dict(exclude_unset=True).items():
        setattr(db_bio, field, value)
    db.commit()
    db.refresh(db_bio)
    return db_bio


@router.delete("/biographies/{id}")
def delete_biography(
    id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    db_bio = db.query(Biography).filter(Biography.id == id).first()
    if not db_bio:
        raise HTTPException(status_code=404, detail="Biography not found")
    db.delete(db_bio)
    db.commit()
    return {"message": "Deleted"}


# ── Archive ──────────────────────────────────────────────

@router.get("/archive", response_model=List[ArchiveItemOut])
def get_all_archive(
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    return db.query(ArchiveItem).order_by(
        ArchiveItem.created_at.desc()
    ).all()


@router.post("/archive", response_model=ArchiveItemOut)
def create_archive_item(
    item: ArchiveItemCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    db_item = ArchiveItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.patch("/archive/{id}", response_model=ArchiveItemOut)
def update_archive_item(
    id: int,
    item: ArchiveItemCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    db_item = db.query(ArchiveItem).filter(ArchiveItem.id == id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for field, value in item.dict(exclude_unset=True).items():
        setattr(db_item, field, value)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/archive/{id}")
def delete_archive_item(
    id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    db_item = db.query(ArchiveItem).filter(ArchiveItem.id == id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Deleted"}


# ── Blog ─────────────────────────────────────────────────

@router.get("/blog", response_model=List[BlogPostOut])
def get_all_posts(
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    return db.query(BlogPost).order_by(
        BlogPost.created_at.desc()
    ).all()


@router.post("/blog", response_model=BlogPostOut)
def create_post(
    post: BlogPostCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    existing = db.query(BlogPost).filter(
        BlogPost.slug == post.slug
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    db_post = BlogPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.patch("/blog/{id}", response_model=BlogPostOut)
def update_post(
    id: int,
    post: BlogPostUpdate,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    db_post = db.query(BlogPost).filter(BlogPost.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    for field, value in post.dict(exclude_unset=True).items():
        setattr(db_post, field, value)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.delete("/blog/{id}")
def delete_post(
    id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin)
):
    db_post = db.query(BlogPost).filter(BlogPost.id == id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return {"message": "Deleted"}