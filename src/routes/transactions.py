from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models.database import get_db
from ..models.transaction import Transaction

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.get("/")
async def get_transactions(db: AsyncSession = Depends(get_db)):
    """Retrieve all transaction logs with filtering by wallet_address (optional)."""
    result = await db.execute(select(Transaction))
    transactions = result.scalars().all()
    return {
        "transactions": [
            {
                "tx_id": t.tx_id,
                "wallet_address": t.wallet_address,
                "action": t.action,
                "status": t.status,
                "timestamp": t.timestamp.isoformat()
            } for t in transactions
        ]
    }