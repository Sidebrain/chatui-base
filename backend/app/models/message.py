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


if __name__ == "__main__":
    ...
