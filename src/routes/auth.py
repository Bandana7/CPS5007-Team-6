from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from ..services.radix_service import RadixService
from ..models.database import get_db
from ..models.transaction import Transaction
from ..models.persona import Persona
from ..models.challenge import Challenge
import secrets
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["Authentication"])

radix = RadixService()

class AuthenticateRequest(BaseModel):
    wallet_address: str
    signature: str
    challenge: str
    public_key: str  # Hex-encoded, compressed public key (33 bytes)

async def log_authentication_event(wallet_address: str, action: str, status: str, db: AsyncSession):
    """Log an authentication event in the database."""
    transaction = Transaction(
        tx_id=secrets.token_hex(8),
        wallet_address=wallet_address,
        action=action,
        status=status
    )
    db.add(transaction)
    await db.commit()

@router.get("/challenge")
async def get_challenge(wallet_address: str, db: AsyncSession = Depends(get_db)):
    """Provide a challenge for the frontend to sign."""
    # Ensure the wallet_address exists in personas
    persona = await db.execute(select(Persona).where(Persona.wallet_address == wallet_address))
    persona = persona.scalars().first()
    if not persona:
        new_persona = Persona(wallet_address=wallet_address)
        db.add(new_persona)
        await db.commit()

    # Generate challenge and set expiration (e.g., 5 minutes)
    challenge = radix.generate_challenge()
    expires_at = datetime.utcnow() + timedelta(minutes=5)

    # Store the challenge
    new_challenge = Challenge(
        challenge=challenge,
        wallet_address=wallet_address,
        expires_at=expires_at
    )
    db.add(new_challenge)
    await db.commit()

    return {"challenge": challenge}

@router.post("/authenticate")
async def authenticate(request: AuthenticateRequest, db: AsyncSession = Depends(get_db)):
    """Authenticate a user using passwordless dApp authentication (ROLA)."""
    wallet_address = request.wallet_address
    signature = request.signature
    challenge = request.challenge
    public_key = request.public_key

    # Ensure the wallet_address exists in personas before any operations
    persona = await db.execute(select(Persona).where(Persona.wallet_address == wallet_address))
    persona = persona.scalars().first()
    if not persona:
        new_persona = Persona(wallet_address=wallet_address)
        db.add(new_persona)
        await db.commit()

    # Validate the challenge
    challenge_record = await db.execute(
        select(Challenge).where(
            Challenge.challenge == challenge,
            Challenge.wallet_address == wallet_address,
            Challenge.expires_at > datetime.utcnow()
        )
    )
    challenge_record = challenge_record.scalars().first()
    if not challenge_record:
        await log_authentication_event(wallet_address, "authenticate", "failed", db)
        raise HTTPException(status_code=401, detail="Invalid or expired challenge")

    # Verify the signature
    try:
        radix.verify_signature(wallet_address, challenge, signature, public_key)
    except HTTPException as e:
        await log_authentication_event(wallet_address, "authenticate", "failed", db)
        raise e

    # Delete the challenge to prevent reuse
    await db.execute(delete(Challenge).where(Challenge.challenge == challenge))
    await db.commit()

    # Log successful authentication
    await log_authentication_event(wallet_address, "authenticate", "success", db)

    return {
        "success": True,
        "message": "Authenticated",
        "wallet_address": wallet_address
    }