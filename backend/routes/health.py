from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/health")
async def health():
    return {"status": "ok"}

@router.get("/ready")
async def readiness(request: Request):
    await request.app.state.db.command("ping")
    return {"status": "ready"}
