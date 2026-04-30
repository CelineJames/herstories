from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    submission_type = Column(String, nullable=False)  # "biography" | "archive"
    subject_name = Column(String, nullable=False)
    country = Column(String, nullable=True)
    category = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    full_story = Column(Text, nullable=True)
    education = Column(Text, nullable=True)
    career_highlights = Column(Text, nullable=True)
    honors = Column(Text, nullable=True)
    impact = Column(Text, nullable=True)
    reason = Column(Text, nullable=True)
    source = Column(Text, nullable=True)
    submitter_name = Column(String, nullable=True)
    submitter_email = Column(String, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)