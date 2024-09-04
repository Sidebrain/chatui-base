from datetime import datetime
from typing import Optional
from pydantic import BaseModel
import app
import app.schemas


class SessionBase(BaseModel):
    user_id: int
    ip_address: str
    user_agent: str
    session_data: Optional[str]
    expires_at: Optional[datetime]


class SessionCreate(SessionBase):
    pass


class SessionUpdate(SessionBase):
    expires_at: Optional[datetime]
    session_data: Optional[str]
    pass


class Session(SessionBase):
    id: int
    created_at: datetime
    last_accessed: datetime

    user: Optional[
        app.schemas.User
    ]  # this is erroring out with `AttributeError: partially initialized module 'app.schemas' has no attribute 'LLM' (most likely due to a circular import)`

    class Config:
        from_attributes = True
