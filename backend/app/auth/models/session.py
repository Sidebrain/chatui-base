from typing import List
from auth.models.base_class import Base as AuthBase

from sqlalchemy import Boolean, Column, ForeignKey, String, Text, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now


class Session(AuthBase):
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), nullable=False
    )
    last_accessed: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), onupdate=now(), nullable=False
    )
    expires_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=now(), nullable=False
    )
    ip_address: Mapped[str] = mapped_column(String)
    user_agent: Mapped[str] = mapped_column(String)
    session_data: Mapped[str] = mapped_column(Text)
    user: Mapped["User"] = relationship(back_populates="sessions")

    def __repr__(self):
        return f"<Session {self.id, self.expires_at}>"


class Provider(AuthBase):
    name: Mapped[str] = mapped_column(String, nullable=False)
    oauth_url: Mapped[str] = mapped_column(String, nullable=False)
    token_url: Mapped[str] = mapped_column(String, nullable=False)
    client_id: Mapped[str] = mapped_column(String, nullable=False)
    client_secret: Mapped[str] = mapped_column(String, nullable=False)
    private_key: Mapped[str] = mapped_column(String, nullable=False)
    public_key: Mapped[str] = mapped_column(String, nullable=False)
    enabled: Mapped[bool] = mapped_column(Boolean, nullable=False)


class UserAuthentication(AuthBase):
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    provider_id: Mapped[str] = mapped_column(ForeignKey("auth.provider.id"))
    provider_user_id: Mapped[str] = mapped_column(String, nullable=False)
