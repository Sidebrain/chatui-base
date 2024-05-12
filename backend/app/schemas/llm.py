from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class LLMBase(BaseModel):
    provider: str
    model: str
    prompt_tokens_cost: float
    completion_tokens_cost: float


class LLMCreate(LLMBase):
    enabled: bool = True
    pass


class LLMUpdate(LLMBase):
    enabled: bool
    pass


class LLM(LLMBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
