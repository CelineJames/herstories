from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime


class ArchiveItemBase(BaseModel):
    title: str
    item_type: str
    description: Optional[str] = None
    era: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = None
    tags: Optional[List[str]] = []
    source: Optional[str] = None
    file_url: Optional[str] = None
    thumbnail_url: Optional[str] = None


class ArchiveItemCreate(ArchiveItemBase):
    pass


class ArchiveItemOut(ArchiveItemBase):
    id: int
    is_published: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class ArchiveListResponse(BaseModel):
    total: int
    items: List[ArchiveItemOut]