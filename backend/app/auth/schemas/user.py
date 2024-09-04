from typing import Literal
from pydantic import BaseModel
from datetime import datetime

class UserAuthBase(BaseModel):
    user_id: str
    provider_id: str
    provider_user_id: str

class UserAuthCreate(UserAuthBase):
    access_token: str
    expires_in: int
    scope: str
    token_type: Literal["Bearer"]
    id_token: str
    pass

class UserAuth(UserAuthBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True