from sqlalchemy import Column, String, Text, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now

from app.models.base_class import Base



class Message(Base):
    # id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    createdAt: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), nullable=False
    )
    updatedAt: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), onupdate=now(), nullable=False
    )
    sender: Mapped[str] = mapped_column(String, nullable=False)
    message: Mapped[str] = mapped_column(Text)


if __name__ == "__main__":
    ...
