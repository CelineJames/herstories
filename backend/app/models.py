
from sqlalchemy import Column, Integer, String, Text, JSON

from app.database import Base  # ✅ This line is critical!



class Biography(Base):
    __tablename__ = "biographies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    image = Column(String)
    summary = Column(String)
    country = Column(String, index=True)
    flag = Column(String, nullable=True)
    category = Column(String, index=True) 
    details = Column(JSON)


