from app.database import SessionLocal
from app.models import Biography

db = SessionLocal()
biographies = db.query(Biography).all()

for bio in biographies:
    print(f"{bio.id}: {bio.name} - {bio.summary}")

db.close()
