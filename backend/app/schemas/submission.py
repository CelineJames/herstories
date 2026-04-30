from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class SubmissionCreate(BaseModel):
    submission_type: str
    subject_name: str
    country: Optional[str] = None
    category: Optional[str] = None
    summary: Optional[str] = None
    full_story: Optional[str] = None
    education: Optional[str] = None
    career_highlights: Optional[str] = None
    honors: Optional[str] = None
    impact: Optional[str] = None
    reason: Optional[str] = None
    source: Optional[str] = None
    submitter_name: Optional[str] = None
    submitter_email: Optional[str] = None


class SubmissionOut(SubmissionCreate):
    id: int
    status: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)