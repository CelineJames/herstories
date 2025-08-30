from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.orm import Session
from app import models, schemas, database
from typing import List
from fastapi import HTTPException

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/biographies/", response_model=schemas.BiographyOut)
def create_biography(bio: schemas.BiographyCreate, db: Session = Depends(get_db)):
    db_bio = models.Biography(**bio.dict())
    db.add(db_bio)
    db.commit()
    db.refresh(db_bio)
    return db_bio

@router.get("/biographies/{id}", response_model=schemas.BiographyOut)
def get_biography(id: int, db: Session = Depends(get_db)):
    bio = db.query(models.Biography).filter(models.Biography.id == id).first()
    if not bio:
        raise HTTPException(status_code=404, detail="Biography not found")
    return bio

# ✅ UPDATED
@router.get("/biographies/")
def read_biographies(
    request: Request,  # ✅ Added to get base_url
    skip: int = 0,
    limit: int = Query(default=10, le=50),
    search: str = Query(default=None),
    country: str = Query(default=None),
    category: str = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Biography)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            models.Biography.name.ilike(search_term) |
            models.Biography.summary.ilike(search_term) |
            models.Biography.details.ilike(search_term)
        )

    if country:
        query = query.filter(models.Biography.country.ilike(f"%{country}%"))

    if category:
        query = query.filter(models.Biography.category.ilike(category.strip()))

    total = query.count()
    biographies = query.offset(skip).limit(limit).all()

    base_url = str(request.base_url)

    # ✅ Enhance each biography with full image & flag URLs
    processed_bios = []
    for bio in biographies:
        processed_bios.append({
            "id": bio.id,
            "name": bio.name,
            "summary": bio.summary,
            "details": bio.details,
            "country": bio.country,
            "category": bio.category,
            "image": bio.image,
            "flag": bio.country,
        })

    return {
        "total": total,
        "biographies": processed_bios
    }

@router.get("/category")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Biography.category).distinct().all()
    return {"categories": [c[0] for c in categories if c[0]]}




# from fastapi import APIRouter, Depends, Query
# from sqlalchemy.orm import Session
# from app import models, schemas, database
# from typing import List
# from fastapi import HTTPException

# router = APIRouter()

# def get_db():
#     db = database.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/biographies/", response_model=schemas.BiographyOut)
# def create_biography(bio: schemas.BiographyCreate, db: Session = Depends(get_db)):
#     db_bio = models.Biography(**bio.dict())
#     db.add(db_bio)
#     db.commit()
#     db.refresh(db_bio)
#     return db_bio

# from fastapi import HTTPException

# @router.get("/biographies/{id}", response_model=schemas.BiographyOut)
# def get_biography(id: int, db: Session = Depends(get_db)):
#     bio = db.query(models.Biography).filter(models.Biography.id == id).first()
#     if not bio:
#         raise HTTPException(status_code=404, detail="Biography not found")
#     return bio


# # ✅ Update this one:
# @router.get("/biographies/")
# def read_biographies(
#     skip: int = 0,
#     limit: int = Query(default=10, le=50),
#     search: str = Query(default=None),
#     country: str = Query(default=None),
#     category: str = Query(default=None),
#     db: Session = Depends(get_db)
# ):
#     query = db.query(models.Biography)

#     if search:
#         search_term = f"%{search}%"
#         query = query.filter(
#             models.Biography.name.ilike(search_term) |
#             models.Biography.summary.ilike(search_term) |
#             models.Biography.details.ilike(search_term)
#         )

#     if country:
#         query = query.filter(models.Biography.country.ilike(f"%{country}%"))

#     if category:
#         query = query.filter(models.Biography.category.ilike(category.strip()))

#     total = query.count()
#     biographies = query.offset(skip).limit(limit).all()

#     return {
#         "total": total,
#         "biographies": biographies
#     }

# @router.get("/category")
# def get_categories(db: Session = Depends(get_db)):
#     categories = db.query(models.Biography.category).distinct().all()
#     return {"categories": [c[0] for c in categories if c[0]]}
