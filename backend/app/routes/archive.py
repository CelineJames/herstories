from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.models import ArchiveItem
from app.schemas import ArchiveItemOut, ArchiveItemCreate, ArchiveListResponse
from app.dependencies import get_db

router = APIRouter(prefix="/archive", tags=["archive"])


@router.get("/", response_model=ArchiveListResponse)
def read_archive(
    skip: int = 0,
    limit: int = Query(default=12, le=50),
    search: str = Query(default=None),
    item_type: str = Query(default=None),
    era: str = Query(default=None),
    region: str = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(ArchiveItem).filter(ArchiveItem.is_published == True)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            ArchiveItem.title.ilike(search_term) |
            ArchiveItem.description.ilike(search_term)
        )
    if item_type:
        query = query.filter(ArchiveItem.item_type == item_type)
    if era:
        query = query.filter(ArchiveItem.era == era)
    if region:
        query = query.filter(ArchiveItem.region.ilike(f"%{region}%"))

    total = query.count()
    items = query.offset(skip).limit(limit).all()

    return {"total": total, "items": items}


@router.get("/{id}", response_model=ArchiveItemOut)
def get_archive_item(id: int, db: Session = Depends(get_db)):
    item = db.query(ArchiveItem).filter(ArchiveItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Archive item not found")
    return item


@router.post("/", response_model=ArchiveItemOut)
def create_archive_item(item: ArchiveItemCreate, db: Session = Depends(get_db)):
    db_item = ArchiveItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item