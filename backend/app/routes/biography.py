from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.models import Biography
from app.schemas import BiographyOut, BiographyCreate, BiographyListResponse
from app.dependencies import get_db

router = APIRouter(prefix="/biographies", tags=["biographies"])


@router.post("/", response_model=BiographyOut)
def create_biography(bio: BiographyCreate, db: Session = Depends(get_db)):
    db_bio = Biography(**bio.dict())
    db.add(db_bio)
    db.commit()
    db.refresh(db_bio)
    return db_bio


@router.get("/", response_model=BiographyListResponse)
def read_biographies(
    skip: int = 0,
    limit: int = Query(default=10, le=50),
    search: str = Query(default=None),
    country: str = Query(default=None),
    category: str = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(Biography)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            Biography.name.ilike(search_term) |
            Biography.summary.ilike(search_term)
        )
    if country:
        query = query.filter(Biography.country.ilike(f"%{country}%"))
    if category:
        query = query.filter(Biography.category.ilike(category.strip()))

    total = query.count()
    biographies = query.offset(skip).limit(limit).all()

    return {"total": total, "biographies": biographies}


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    all_categories = set()
    categories = db.query(Biography.category).all()

    for (category_str,) in categories:
        if category_str:
            raw_categories = category_str.replace("&", ",").split(",")
            for cat in raw_categories:
                cleaned = cat.strip()
                if cleaned:
                    all_categories.add(cleaned)

    return {"categories": sorted(all_categories)}


@router.get("/{slug_or_id}", response_model=BiographyOut)
def get_biography(slug_or_id: str, db: Session = Depends(get_db)):
    # Try slug first
    bio = db.query(Biography).filter(Biography.slug == slug_or_id).first()

    # If not found by slug, try by ID
    if not bio:
        try:
            bio_id = int(slug_or_id)
            bio = db.query(Biography).filter(Biography.id == bio_id).first()
        except ValueError:
            pass

    if not bio:
        raise HTTPException(status_code=404, detail="Biography not found")
    return bio