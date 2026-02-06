from fastapi import APIRouter, Request, Query
from typing import List
from ..models.status import StatusCheck, StatusCheckCreate

router = APIRouter(prefix="/status")

@router.post("/", response_model=StatusCheck)
async def create_status(payload: StatusCheckCreate, request: Request):
    status = StatusCheck(**payload.model_dump())
    await request.app.state.db.status_checks.insert_one(
        status.model_dump()
    )
    return status

@router.get("/", response_model=List[StatusCheck])
async def get_status_checks(
    request: Request,
    limit: int = Query(default=50, ge=1, le=500),
):
    cursor = (
        request.app.state.db.status_checks
        .find({}, {"_id": 0})
        .sort("timestamp", -1)
        .limit(limit)
    )

    return await cursor.to_list(length=limit)
