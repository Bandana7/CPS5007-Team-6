from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

# Load DATABASE_URL and validate
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL must be set in .env file")

# Async engine and session
async_engine = create_async_engine(DATABASE_URL, echo=True)  # Set echo=False in production
AsyncSessionLocal = sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

async def get_db():
    """Provide an async database session for FastAPI routes."""
    async with AsyncSessionLocal() as session:
        yield session