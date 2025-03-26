from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.sql import func
from .database import Base

class Persona(Base):
    __tablename__ = "personas"
    wallet_address = Column(String(255), primary_key=True)  # Use wallet_address as primary key
    name = Column(String(100), nullable=True)  # Make name optional
    created_at = Column(TIMESTAMP, server_default=func.now())