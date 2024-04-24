from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app import schemas


class MessageBase(BaseModel):
    role: str
    content: str
    prompt_tokens: Optional[int] = None
    completion_tokens: Optional[int] = None
    cost: Optional[float] = None


class MessageCreate(MessageBase):
    llm_id: Optional[int] = None
    conv_id: int
    pass


class MessageUpdate(MessageBase):
    content: str
    pass


class Message(MessageBase):
    id: int
    created_at: datetime
    updated_at: datetime

    # llm: Optional[schemas.LLM]

    class Config:
        from_attributes = True
