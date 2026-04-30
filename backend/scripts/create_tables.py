from app.database import Base, engine
from app.models import Biography, ArchiveItem, Submission, BlogPost

print("Creating all tables...")
Base.metadata.create_all(bind=engine)
print("Done.")