from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from .database import Base

class Challenge(Base):
    __tablename__ = "challenges"
    challenge = Column(String(32), primary_key=True)  # Hex string from secrets.token_hex(16)
    wallet_address = Column(String(255), ForeignKey("personas.wallet_address"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    expires_at = Column(TIMESTAMP, nullable=False)