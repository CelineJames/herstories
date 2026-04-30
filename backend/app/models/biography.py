from sqlalchemy import Column, Integer, String, JSON
from app.database import Base


class Biography(Base):
    __tablename__ = "biographies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True, nullable=True)
    image = Column(String)
    summary = Column(String)
    country = Column(String, index=True)
    flag = Column(String, nullable=True)
    category = Column(String, index=True)
    details = Column(JSON)