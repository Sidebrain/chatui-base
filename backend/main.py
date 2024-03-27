from pydantic.main import BaseModel
import uvicorn
from fastapi import FastAPI, APIRouter, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from typing import List
from sqlalchemy.orm import Session

from app import models, schemas
from app import deps
from app import crud
from app.db.session import SessionLocal
from functionality.call_llm import get_chat_response_from_openai
from functionality.openai_types import ChatCompletionType

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
fh = logging.FileHandler("app.log")
fh.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger.addHandler(fh)


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)

api_router = APIRouter()


@api_router.get("/", status_code=200)
def root(request: Request, db: Session = Depends(deps.get_db)) -> dict:
    return {"HWE": "I seem to be working correctly"}


@api_router.post(
    "/converse/create_conversation",
    status_code=200,
    response_model=schemas.Conversation,
)
def create_conversation(
    user_id: int, db: Session = Depends(deps.get_db)
) -> schemas.Conversation:
    return crud.conversation.create_conversation_or_return_empty(db, user_id)


@api_router.get(
    "/converse/get_all_messages_of_conversation",
    status_code=200,
    response_model=List[schemas.Message],
)
def get_all_messages_of_conversation(
    conv_id: int, user_id: int, db: Session = Depends(deps.get_db)
) -> List[schemas.Message]:
    #! add test for this
    message_list = crud.message.get_messages_by_conversation_id(db, conv_id)
    if not message_list:
        raise HTTPException(
            status_code=404, detail="No messages found for this conversation"
        )
    if set([msg.conv_id for msg in message_list]) != set([conv_id]):
        raise HTTPException(
            status_code=404, detail="Conversation id mismatch in messages"
        )
    return message_list


@api_router.post(
    "/converse/add_message", status_code=200, response_model=schemas.Message
)
def add_message(
    user_id: int,
    message: schemas.MessageBase,
    conv_id: int | None = None,
    db: Session = Depends(deps.get_db),
) -> schemas.Message:
    logger.debug(f"Adding message to conversation for user_id: {user_id}")

    if not conv_id:
        conv: models.Conversation = (
            crud.conversation.create_conversation_or_return_empty(db, user_id)
        )
    else:
        conv: models.Conversation = crud.conversation.get(db, conv_id)
    input_msg = schemas.MessageCreate(
        content=message.content, role=message.role, conv_id=conv.id
    )
    # make some user access checks here
    if conv.owner_id != user_id:
        raise HTTPException(
            status_code=401, detail="conversation returned is not owned by the user"
        )
    message: models.Message = crud.message.add_message_to_conversation(
        db, conv.id, input_msg
    )
    return message


@api_router.post(
    "/converse/get_all_conversations_by_user_id",
    status_code=200,
    response_model=List[schemas.Conversation],
)
def get_all_conversations_by_user_id(
    user_id: int, db: Session = Depends(deps.get_db)
) -> List[schemas.Conversation]:
    logger.debug(f"Getting all conversations for user_id: {user_id}")
    conversations = crud.conversation.get_all_conversations_by_user_id(db, user_id)
    return conversations


@api_router.post("/converse/v1", status_code=200, response_model=schemas.Message)
def converse(
    user_id: int, conv_id: int, db: Session = Depends(deps.get_db)
) -> schemas.Message:
    """
    1. Create a new conversation
    2. Add messages to the conversation
    3. Get response from api
    4. Add response to db
    5. Send response to client
    """
    # 0 Ensure user_id is valid
    if not user_id:
        logger.error("Invalid user_id")
        raise HTTPException(
            status_code=401, detail="Invalid user_id / no user_id provided"
        )

    user: models.User | None = crud.user.get(db, user_id)

    if user is None:
        logger.error("User not found")
        raise HTTPException(status_code=404, detail="User not found")

    logger.debug(f"Creating / retreiving conversation for user_id: {user_id}")
    conversation = crud.conversation.get(db, conv_id)

    # 1.1 Ensure conversation exists
    if not conversation:
        logger.error("Conversation not found")
        raise HTTPException(status_code=404, detail="Conversation not found")

    # 1.2 Ensure user_id and conv.owner_id match
    elif conversation.owner_id != user_id:
        logger.error("User does not own this conversation")
        raise HTTPException(
            status_code=401, detail="User does not own this conversation"
        )
    # 1.3 Ensure conversation has atleast some messages
    elif not conversation.messages:
        logger.error("Conversation has no messages")
        raise HTTPException(status_code=409, detail="Conversation has no messages")

    # 2 Get response from api
    response: ChatCompletionType = get_chat_response_from_openai(conversation.messages)
    logger.debug(f"Response received from OpenAI")

    # 3 Add response to db
    response_msg = schemas.MessageCreate(
        content=response.choices[0].message.content,
        role=response.choices[0].message.role,
        conv_id=conv_id,
    )
    response_msg_db = crud.message.add_message_to_conversation(
        db, user_id, conv_id, response_msg
    )

    return response_msg_db


app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run("main:app")
