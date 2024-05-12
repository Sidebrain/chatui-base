from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi import APIRouter

from sqlalchemy.orm import Session

from functionality.call_llm import get_chat_response_from_openai
from functionality.openai_types import ChatCompletionType
from app import models, schemas, deps, crud

import logging

# the log level is being set globally via basicConfig in main.py, use this overwrite but revert back after youre done testing
logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
fh = logging.FileHandler("logs/app.log")
# fh.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
fh.setFormatter(formatter)
logger.addHandler(fh)

router = APIRouter(
    prefix="/converse",
)


@router.get("/models", status_code=200, response_model=list[schemas.LLM])
def get_all_llms(db: Session = Depends(deps.get_db)) -> list[schemas.LLM]:
    return crud.llm.get_all_available_llms(db)


@router.post(
    "/create_conversation",
    status_code=200,
    response_model=schemas.Conversation,
)
def create_conversation(
    user_id: int, db: Session = Depends(deps.get_db)
) -> schemas.Conversation:
    return crud.conversation.create_conversation_or_return_empty(db, user_id)


@router.get(
    "/get_all_messages_of_conversation",
    status_code=200,
    response_model=List[schemas.Message],
)
def get_all_messages_of_conversation(
    conv_id: int, user_id: int, db: Session = Depends(deps.get_db)
) -> List[schemas.Message]:
    #! add test for this
    message_list = crud.message.get_messages_by_conversation_id(db, conv_id)
    if not message_list:
        return []
        # raise HTTPException(
        #     status_code=404, detail="No messages found for this conversation"
        # )
    if set([msg.conv_id for msg in message_list]) != set([conv_id]):
        raise HTTPException(
            status_code=404, detail="Conversation id mismatch in messages"
        )
    return message_list


@router.post("/add_message", status_code=200, response_model=schemas.Message)
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
        db, user_id, conv.id, input_msg
    )
    return message


@router.post(
    "/get_all_conversations_by_user_id",
    status_code=200,
    response_model=List[schemas.Conversation],
)
def get_all_conversations_by_user_id(
    user_id: int, db: Session = Depends(deps.get_db)
) -> List[schemas.Conversation]:
    logger.debug(f"Getting all conversations for user_id: {user_id}")
    conversations = crud.conversation.get_all_conversations_by_user_id(db, user_id)
    return conversations


@router.post("/v1", status_code=200, response_model=schemas.Message)
def converse(
    user_id: int, conv_id: int, llm: schemas.LLM, db: Session = Depends(deps.get_db)
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

    # 2.1 get the cost of the response
    cost = (
        llm.prompt_tokens_cost * response.usage.prompt_tokens
        + llm.completion_tokens_cost * response.usage.completion_tokens
    )

    # 3 Add response to db
    response_msg = schemas.MessageCreate(
        content=response.choices[0].message.content,
        role=response.choices[0].message.role,
        conv_id=conv_id,
        prompt_tokens=response.usage.prompt_tokens,
        completion_tokens=response.usage.completion_tokens,
        cost=cost,
        llm_id=llm.id,
    )
    response_msg_db = crud.message.add_message_to_conversation(
        db, user_id, conv_id, response_msg
    )

    return response_msg_db
