from app.database import SessionLocal
import os
from fastapi import Depends, HTTPException, Header


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def require_admin(x_admin_key: str = Header(...)):
    admin_key = os.getenv("ADMIN_SECRET_KEY")
    if not admin_key or x_admin_key != admin_key:
        raise HTTPException(
            status_code=403,
            detail="Not authorised"
        )
    return True