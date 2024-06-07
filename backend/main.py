from fastapi.responses import RedirectResponse
import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.routers import conversation_router, auth

import logging

# global logging level
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)

app.include_router(conversation_router.router, tags=["conversation"])
app.include_router(auth.router, tags=["auth"])


@app.get("/", status_code=200)
def root() -> dict:
    return RedirectResponse(url="/docs")


if __name__ == "__main__":
    uvicorn.run("main:app")
