import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
S3_BASE = "https://herstories-media.s3.us-east-1.amazonaws.com"

engine = create_engine(DATABASE_URL)

def update_urls():
    with engine.connect() as conn:
        # Get all biographies
        result = conn.execute(text("SELECT id, name, image, flag FROM biographies"))
        biographies = result.fetchall()

        print(f"\nUpdating {len(biographies)} biographies...\n")

        for bio in biographies:
            id, name, image, flag = bio

            # Fix image URL
            new_image = image
            if image and not image.startswith("http"):
                new_image = f"{S3_BASE}/assets/{image}"

            # Fix flag URL
            new_flag = flag
            if flag and not flag.startswith("http"):
                # flag is stored as "flags/nigeria.png" — prepend S3 base + assets/
                new_flag = f"{S3_BASE}/assets/{flag}"

            if new_image != image or new_flag != flag:
                conn.execute(
                    text(
                        "UPDATE biographies SET image = :image, flag = :flag WHERE id = :id"
                    ),
                    {"image": new_image, "flag": new_flag, "id": id},
                )
                print(f"  ✓ {name}")
                print(f"    image: {new_image}")
                print(f"    flag:  {new_flag}")

        conn.commit()

        # Update archive thumbnail URLs
        result = conn.execute(
            text("SELECT id, title, thumbnail_url FROM archive_items")
        )
        archive_items = result.fetchall()

        print(f"\nUpdating {len(archive_items)} archive items...\n")

        for item in archive_items:
            id, title, thumbnail_url = item

            new_thumbnail = thumbnail_url
            if thumbnail_url and not thumbnail_url.startswith("http"):
                # thumbnail stored as "/assets/wangari.jpeg" — strip leading slash
                filename = thumbnail_url.lstrip("/assets/")
                new_thumbnail = f"{S3_BASE}/assets/{filename}"

            if new_thumbnail != thumbnail_url:
                conn.execute(
                    text(
                        "UPDATE archive_items SET thumbnail_url = :url WHERE id = :id"
                    ),
                    {"url": new_thumbnail, "id": id},
                )
                print(f"  ✓ {title}")
                print(f"    thumbnail: {new_thumbnail}")

        conn.commit()

        print("\nDone. All image URLs updated to S3.")


if __name__ == "__main__":
    update_urls()