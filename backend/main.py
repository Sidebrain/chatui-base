from pydantic.main import BaseModel
import uvicorn
from fastapi import FastAPI, APIRouter, Request, Depends
from fastapi.middleware.cors import CORSMiddleware

from typing import List
from sqlalchemy.orm import Session

from app import schemas
from app import deps
from app import crud




app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)

api_router = APIRouter()


@api_router.get("/", status_code=200)
def root(request: Request, db: Session = Depends(deps.get_db)) -> dict:
    return {"HWE": "I seem to be working correctly"}


@api_router.post("/converse", status_code=200, response_model=schemas.Message)
def converse(
    input_msg: schemas.MessageCreate, db: Session = Depends(deps.get_db)
) -> schemas.Message:
    # add message to database
    msg_human = crud.message.create(db=db, obj_in=input_msg)
    # get response
    # add response to database
    msg_agent = schemas.MessageCreate(
        message="I ran from the api",
        sender="human"
    )
    agent_response = crud.message.create(db=db, obj_in=msg_agent)
    # return response
    print(agent_response)
    return agent_response

class MessageInput(BaseModel):
    content: str
    role: str

@api_router.post("/converse2", status_code=200, response_model=schemas.Message)
def converse2(
    input_msgs: List[MessageInput], db: Session = Depends(deps.get_db)
) -> schemas.Message:
    print("-"*30 + '\n', input_msgs, '\n' + "-"*30)
    for msg in input_msgs:
        input_schema = schemas.MessageCreate(
            message=msg.content,
            sender=msg.role,
        )
        print(input_schema)
        response = crud.message.create(db=db, obj_in=input_schema)
    return response


app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run("main:app")