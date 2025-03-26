from fastapi import FastAPI
from .routes import personas, transactions, auth
from .models.database import Base, async_engine
from .models.challenge import Challenge  # Import to ensure table creation

app = FastAPI(
    title="Radix Persona Demo API",
    description="A demo API for passwordless dApp authentication using Radix Connect on Stokenet.",
    version="1.0.0"
)

# Include routers
app.include_router(personas.router)
app.include_router(transactions.router)
app.include_router(auth.router)

# Define a root endpoint
@app.get("/")
async def root():
    """Welcome endpoint for the Radix Persona Demo API."""
    return {"message": "Welcome to the Radix Persona Demo API!"}

@app.on_event("startup")
async def startup_event():
    """Create database tables on startup."""
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

    #uvicorn src.main:app --reload to run agit  program