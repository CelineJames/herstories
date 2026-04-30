# app/delete_wrong_bio.py
from app.database import SessionLocal
from app.models import Biography

db = SessionLocal()
bio = db.query(Biography).filter(Biography.name == "Ngozi Okonjo-Iweala").first()
if bio:
    db.delete(bio)
    db.commit()
    print("Deleted old biography for Ngozi.")
else:
    print("No existing biography to delete.")
db.close()
