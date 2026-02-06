from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import logging

from backend.core.config import CORS_ORIGINS
from backend.core.database import lifespan
from backend.routes.health import router as health_router
from backend.routes.status import router as status_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(status_router, prefix="/api")
