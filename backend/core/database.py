from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from fastapi import FastAPI
from .config import MONGO_URL, DB_NAME
import logging

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    # Attach to app state
    app.state.mongo_client = client
    app.state.db = db

    # Create indexes (SAFE to run multiple times)
    await db.status_checks.create_index("timestamp")

    logger.info("MongoDB connected & indexes ensured")
    yield
    client.close()
    logger.info("MongoDB connection closed")
