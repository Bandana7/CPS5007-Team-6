from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from .database import Base

class Transaction(Base):
    __tablename__ = "transactions"
    tx_id = Column(String(16), primary_key=True)  # Shortened for off-ledger logging
    wallet_address = Column(String(255), ForeignKey("personas.wallet_address"))  # Updated foreign key
    action = Column(String(50), nullable=False)
    status = Column(String(20), nullable=False)
    timestamp = Column(TIMESTAMP, server_default=func.now())