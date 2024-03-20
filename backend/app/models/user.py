
from typing import List
from app.models.base_class import Base

from sqlalchemy import Column, String, Text, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now

# from app.models.conversation import Conversation

class User(Base):
    username: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String)
    phone: Mapped[str] = mapped_column(String)
    convs: Mapped[List["Conversation"]] = relationship(back_populates="owner")
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), nullable=False
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), onupdate=now(), nullable=False
    )

    def __repr__(self):
        return f"<User {self.username}>"