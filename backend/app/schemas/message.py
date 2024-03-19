from datetime import datetime
from pydantic import BaseModel


class MessageBase(BaseModel):
    sender: str
    message: str


class MessageCreate(MessageBase):
    pass


class Message(MessageBase):
    id: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
