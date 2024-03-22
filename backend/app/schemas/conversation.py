from pydantic import BaseModel
from datetime import datetime


class ConversationBase(BaseModel):
    summary: str = ""
    description: str = ""
    pass


class ConversationCreate(ConversationBase):
    owner_id: int
    pass


class Conversation(ConversationBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
