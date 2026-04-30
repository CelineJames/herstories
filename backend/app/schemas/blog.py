from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    category: Optional[str] = None
    cover_image: Optional[str] = None
    author: Optional[str] = "HerStories"


class BlogPostCreate(BlogPostBase):
    is_published: Optional[bool] = False


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    cover_image: Optional[str] = None
    is_published: Optional[bool] = None


class BlogPostOut(BlogPostBase):
    id: int
    is_published: bool
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)


class BlogListResponse(BaseModel):
    total: int
    posts: list[BlogPostOut]