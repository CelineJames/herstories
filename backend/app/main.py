from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import Biography, ArchiveItem
from app import database
from app.routes import biography, archive, submissions, blog, chat
import os

database.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="HerStories API", version="1.0.0")

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(biography.router)
app.include_router(archive.router)
app.include_router(submissions.router)
app.include_router(blog.router)
app.include_router(chat.router)


@app.get("/health")
def health_check():
    return {"status": "ok", "message": "HerStories API is running"}