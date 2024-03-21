from datetime import datetime
from pydantic import BaseModel


class MessageBase(BaseModel):
    role: str
    content: str


class MessageCreate(MessageBase):
    conv_id: int
    pass

class MessageUpdate(MessageBase):
    content: str
    pass


class Message(MessageBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
