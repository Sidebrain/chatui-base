from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class LLMBase(BaseModel):
    provider: str
    model: str
    prompt_tokens_cost: float
    completion_tokens_cost: float


class LLMCreate(LLMBase):
    pass


class LLMUpdate(LLMBase):
    pass


class LLM(LLMBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
