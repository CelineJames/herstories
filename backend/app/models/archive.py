from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime
from app.database import Base


class ArchiveItem(Base):
    __tablename__ = "archive_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    item_type = Column(String, nullable=False)
    description = Column(Text)
    era = Column(String, index=True)
    region = Column(String, index=True)
    country = Column(String)
    tags = Column(ARRAY(String), default=[])
    source = Column(String, nullable=True)
    file_url = Column(String, nullable=True)
    thumbnail_url = Column(String, nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)