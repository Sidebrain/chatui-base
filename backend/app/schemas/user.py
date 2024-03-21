from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: str
    phone: str
    pass

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True