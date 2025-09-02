from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import router

app = FastAPI()

# CORS configuration to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
# app.include_router(auth_router) # Currently not in use
app.include_router(router, tags=["search"])

if __name__ == "__main__":
    # import uvicorn
    # import os
    # port = int(os.getenv("PORT", 3001))
    # uvicorn.run(app, host="0.0.0.0", port=port)
    pass