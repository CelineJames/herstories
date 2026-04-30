from slugify import slugify
from app.database import SessionLocal
from app.models import Biography

db = SessionLocal()

biographies = db.query(Biography).all()

print(f"Adding slugs to {len(biographies)} biographies...")

for bio in biographies:
    if not bio.slug:
        bio.slug = slugify(bio.name)
        print(f"  {bio.name} → {bio.slug}")

db.commit()
db.close()

print("Done.")