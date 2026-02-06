from dotenv import load_dotenv
from pathlib import Path
import os

ROOT_DIR = Path(__file__).resolve().parents[1]
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

if not MONGO_URL:
    raise RuntimeError("MONGO_URL is not set")

if not DB_NAME:
    raise RuntimeError("DB_NAME is not set")
