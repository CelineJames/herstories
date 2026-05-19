import os
import boto3
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION"),
)

BUCKET = os.getenv("AWS_BUCKET_NAME")
REGION = os.getenv("AWS_REGION")

# All source directories
FRONTEND_ASSETS = Path(__file__).parent.parent.parent / "frontend" / "public" / "assets"
BACKEND_STATIC = Path(__file__).parent.parent / "app" / "static"
BACKEND_FLAGS = Path(__file__).parent.parent / "app" / "static" / "flags"
PUBLIC_ROOT = Path(__file__).parent.parent.parent / "frontend" / "public"

CONTENT_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
}

# Files to skip in public root — these must stay in public/
SKIP_FILES = {
    "logo.png", "logo-white.png",
    "apple-touch-icon.png", "favicon-32x32.png",
    "favicon-16x16.png", "favicon.ico",
}

# Track uploaded s3 keys to avoid duplicates
uploaded = set()


def upload_file(local_path: Path, s3_key: str):
    if s3_key in uploaded:
        print(f"  ⟳ skipped (duplicate): {s3_key}")
        return None

    ext = local_path.suffix.lower()
    content_type = CONTENT_TYPES.get(ext, "application/octet-stream")

    try:
        s3.upload_file(
            str(local_path),
            BUCKET,
            s3_key,
            ExtraArgs={
                "ContentType": content_type,
                "CacheControl": "max-age=31536000",
            },
        )
        url = f"https://{BUCKET}.s3.{REGION}.amazonaws.com/{s3_key}"
        uploaded.add(s3_key)
        print(f"  ✓ {s3_key}")
        return url
    except Exception as e:
        print(f"  ✗ {s3_key} — {e}")
        return None


def upload_directory(directory: Path, s3_prefix: str, label: str, skip: set = None):
    print(f"\n{label}:")
    if not directory.exists():
        print(f"  Directory not found: {directory}")
        return 0

    count = 0
    for f in sorted(directory.iterdir()):
        if f.is_file() and f.suffix.lower() in CONTENT_TYPES:
            if skip and f.name in skip:
                print(f"  ⟳ skipped (keep in public): {f.name}")
                continue
            upload_file(f, f"{s3_prefix}/{f.name}")
            count += 1

    print(f"  → {count} files processed")
    return count


def upload_all():
    print(f"\nUploading everything to s3://{BUCKET}")
    print(f"Region: {REGION}")
    print("=" * 50)

    # 1. Frontend assets — biography photos, UI images, social icons
    upload_directory(FRONTEND_ASSETS, "assets", "Frontend assets (biography photos + UI)")

    # 2. Backend static — biography photos (duplicates will be skipped)
    upload_directory(BACKEND_STATIC, "assets", "Backend static (biography photos)")

    # 3. Backend flags
    upload_directory(BACKEND_FLAGS, "assets/flags", "Flag images")

    # 4. Public root textures — Hall of Fame 3D scene textures
    upload_directory(PUBLIC_ROOT, "textures", "Public root textures (Hall of Fame)", skip=SKIP_FILES)

    print("\n" + "=" * 50)
    print(f"Total uploaded: {len(uploaded)} unique files")
    print(f"\nS3 Base URL:")
    print(f"  https://{BUCKET}.s3.{REGION}.amazonaws.com/")
    print(f"\nExample URLs:")
    print(f"  https://{BUCKET}.s3.{REGION}.amazonaws.com/assets/wangari.jpeg")
    print(f"  https://{BUCKET}.s3.{REGION}.amazonaws.com/assets/flags/nigeria.png")
    print(f"  https://{BUCKET}.s3.{REGION}.amazonaws.com/textures/floor2.avif")


if __name__ == "__main__":
    upload_all()