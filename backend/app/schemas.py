from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class BiographyBase(BaseModel):
    name: str
    image: str
    summary: str
    country: str
    flag: Optional[str] = None
    category: str
    details: Optional[Dict[str, Any]]

class BiographyCreate(BiographyBase):
    pass

class BiographyOut(BiographyBase):
    id: int

    class Config:
        orm_mode = True

class BiographyListResponse(BaseModel):
    total: int
    biographies: List[BiographyOut]
