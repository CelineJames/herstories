from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any


class BiographyBase(BaseModel):
    name: str
    slug: Optional[str] = None
    image: str
    summary: str
    country: str
    flag: Optional[str] = None
    category: str
    details: Optional[Dict[str, Any]] = None


class BiographyCreate(BiographyBase):
    pass


class BiographyOut(BiographyBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


class BiographyListResponse(BaseModel):
    total: int
    biographies: List[BiographyOut]