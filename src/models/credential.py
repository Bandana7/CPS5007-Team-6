# from sqlalchemy import Column, String, JSON, TIMESTAMP, ForeignKey
# from sqlalchemy.sql import func
# from .database import Base
#
# class Credential(Base):
#     __tablename__ = "credentials"
#     credential_id = Column(String(255), primary_key=True)
#     persona_id = Column(String(255), ForeignKey("personas.persona_id"))
#     credential_type = Column(String(50), nullable=False)
#     data = Column(JSON, nullable=False)
#     issued_at = Column(TIMESTAMP, server_default=func.now())