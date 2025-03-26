from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models.database import get_db
from ..models.persona import Persona

router = APIRouter(prefix="/personas", tags=["Personas"])

@router.get("/")
async def get_personas(db: AsyncSession = Depends(get_db)):
    """Retrieve all personas with pagination."""
    result = await db.execute(select(Persona))
    personas = result.scalars().all()
    return {"personas": [{"wallet_address": p.wallet_address, "name": p.name} for p in personas]}