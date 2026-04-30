from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Submission
from app.schemas.submission import SubmissionCreate, SubmissionOut
from app.dependencies import get_db
from typing import List

router = APIRouter(prefix="/submissions", tags=["submissions"])


@router.post("/", response_model=SubmissionOut)
def create_submission(
    submission: SubmissionCreate,
    db: Session = Depends(get_db)
):
    db_submission = Submission(**submission.dict())
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission


@router.get("/", response_model=List[SubmissionOut])
def get_submissions(
    status: str = "pending",
    db: Session = Depends(get_db)
):
    return db.query(Submission).filter(
        Submission.status == status
    ).order_by(Submission.created_at.desc()).all()


@router.patch("/{id}/approve")
def approve_submission(id: int, db: Session = Depends(get_db)):
    submission = db.query(Submission).filter(Submission.id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    submission.status = "approved"
    db.commit()
    return {"message": "Submission approved"}


@router.patch("/{id}/reject")
def reject_submission(id: int, db: Session = Depends(get_db)):
    submission = db.query(Submission).filter(Submission.id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    submission.status = "rejected"
    db.commit()
    return {"message": "Submission rejected"}