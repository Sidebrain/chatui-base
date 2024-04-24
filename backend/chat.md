I am using sqlalchemy along with fastapi. It is a chat application.

Database schema:

```
user [icon: user] {
  id number pk
  username string
  email email
  phone phone
  created_at timestamp
  updated_at timestamp
}

message [icon: message-circle] {
  id number pk
  created_at timestamp
  updated_at timestamp
  role string
  content string
  conv_id number fk
  prompt_tokens number
  completion_tokens number
  llm_id string
  price number | null
}

conversation [icon: chat] {
  id number pk
  owner_id number fk
  created_at timestamp
  updated_at timestamp
  summary text
  description string
}

llm {
  id number
  provider string
  model string
  prompt_tokens_cost number
  completion_tokens_cost number
  created_at datetime
}

// Relationships
conversation.owner_id > user.id
message.conv_id > conversation.id
message.llm_id > llm.id
```

Here is the code for `models/message.py`:

```python

from sqlalchemy import String, Text, Integer, DateTime, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now

from app.models.base_class import Base

# from app.models.conversation import Conversation


class Message(Base):
    # id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), nullable=False
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), onupdate=now(), nullable=False
    )
    role: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(Text)
    conv_id: Mapped[int] = mapped_column(ForeignKey("conversation.id"))
    conversation: Mapped["Conversation"] = relationship(back_populates="messages")
    prompt_tokens: Mapped[int] = mapped_column(Integer, nullable=True)
    completion_tokens: Mapped[int] = mapped_column(Integer, nullable=True)
    cost: Mapped[float] = mapped_column(Float, nullable=True)
    llm_id: Mapped[int] = mapped_column(ForeignKey("llm.id"), nullable=True)
    llm: Mapped["LLM"] = relationship(back_populates="messages")

```

Here is the code for `models/llm.py`:

```python

from typing import List
from sqlalchemy import DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now

from app.models.base_class import Base


class LLM(Base):
    provider: Mapped[str]
    model: Mapped[str]
    prompt_tokens_cost: Mapped[float]
    completion_tokens_cost: Mapped[float]
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), nullable=False
    )
    messages: Mapped[List["Message"]] = relationship(
        back_populates="llm", lazy="dynamic"
    )
```

Here is the code for `schemas/llm.py`:

```python

from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app import schemas


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
    messages: list[schemas.Message]

    class Config:
        from_attributes = True

```

Here is the code for `schemas/message.py`:

```python

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

    llm: Optional[
        schemas.LLM
    ]  # this is erroring out with `AttributeError: partially initialized module 'app.schemas' has no attribute 'LLM' (most likely due to a circular import)`

    class Config:
        from_attributes = True

```

I am getting the following error:

```
AttributeError: partially initialized module 'app.schemas' has no attribute 'LLM' (most likely due to a circular import)
```

I am not sure how to resolve this. I ttried namign the file `llm_db` to avoid name conflicts but that did not work. I also tried importing the `LLM` class from `schemas/llm.py` in `schemas/message.py` but that did not work either. I am not sure how to resolve this. Any help would be appreciated. Thanks.
