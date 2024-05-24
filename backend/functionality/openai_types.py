from typing import List, Optional
from pydantic import BaseModel, Field, field_validator
import datetime


class MessageType(BaseModel):
    role: str
    content: str


class ChoiceType(BaseModel):
    index: int
    message: MessageType
    logprobs: Optional[dict] = None  # Assuming logprobs is a dictionary or None
    finish_reason: str


class UsageType(BaseModel):
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int


class ChatCompletionType(BaseModel):
    id: str
    object: str
    created: datetime.datetime = Field(..., alias="created")
    model: str
    system_fingerprint: str | None
    choices: List[ChoiceType]
    usage: UsageType

    # Custom method to handle Unix timestamp conversion
    @field_validator("created", mode="before")
    @classmethod
    def transform(cls, timestamp: int):
        return datetime.datetime.fromtimestamp(timestamp)

class OpenAIRequest(BaseModel):
    messages: List[MessageType]
    model: str
    frequency_penalty: float = 0.0
    logprobs: bool = False
    max_tokens: int | None = None
    n: int = 1
    presence_penalty: float = 0.0
    temperature: float = 0.5
    top_p: float = 1.0
    stop: Optional[List[str]] = None