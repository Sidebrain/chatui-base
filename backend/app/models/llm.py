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
    enabled: Mapped[bool] = mapped_column(default=True, nullable=False)

    def __repr__(self) -> str:
        return f"<LLM {self.id} {self.provider} {self.model}>"
