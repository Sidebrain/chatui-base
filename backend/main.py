import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.routers import conversation_router

import logging

# global logging level
logging.basicConfig(level=logging.WARNING)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)

app.include_router(conversation_router.router, tags=["conversation"])


@app.get("/", status_code=200)
def root() -> dict:
    return {"HWE": "Woweee, I seem to be working correctly"}


if __name__ == "__main__":
    uvicorn.run("main:app")
