# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.ext.asyncio import AsyncSession
# from ..models.database import get_db
# from ..models.credential import Credential
# from sqlalchemy import select
#
# router = APIRouter(prefix="/credentials", tags=["Credentials"])
#
# @router.get("/")
# async def get_credentials(db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(Credential))
#     credentials = result.scalars().all()
#     return {"credentials": credentials}