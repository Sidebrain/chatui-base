from typing import List
from app.models.base_class import Base

from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now

# from app.models.message import Message
# from app.models.user import User

class Conversation(Base):
    owner_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    created_at: Mapped[DateTime] = mapped_column(

        DateTime(timezone=True), server_default=now(), nullable=False
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), onupdate=now(), nullable=False
    )
    summary: Mapped[str] = mapped_column(Text)
    description: Mapped[str] = mapped_column(Text)
    messages: Mapped[List["Message"]] = relationship(back_populates="conversation")
    owner: Mapped["User"] = relationship(back_populates="convs")
