from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import router as api_router

app = FastAPI(title="🧠 NeuroFlow API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(api_router, prefix="/api/v1")

# Health endpoints
@app.get("/")
async def root():
    return {"message": "🧠 NeuroFlow API v1.0 - LIVE! 🚀"}

@app.get("/health")
async def health():
    return {"status": "healthy", "ai": "Gemini", "aws": "S3 Ready"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)