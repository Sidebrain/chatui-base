from datetime import datetime
from pydantic.main import BaseModel

from app import models, schemas
from functionality.openai_types import ChatCompletionType
from .llm_clients import openai_client

import logging

logger = logging.getLogger(__name__)


def get_chat_response_from_openai(messages: list[models.Message]) -> ChatCompletionType:
    """
    Get a response from the OpenAI API
    """
    logger.debug(
        f"Getting response from api for conversation with {len(messages)} messages"
    )
    system_msg = {"role": "system", "content": "You are a helpful assistant"}
    messages = [{"role": msg.role, "content": msg.content} for msg in messages]
    completion = openai_client.chat.completions.create(
        messages=[system_msg] + messages,  # joining system and user messages
        model="gpt-3.5-turbo",
    )
    completion_pydantic_obj = ChatCompletionType.model_validate(
        obj=completion,
        from_attributes=True,
    )
    return completion_pydantic_obj
