from abc import abstractmethod, ABCMeta
from typing import Literal

from pydantic import BaseModel, Field


class UrlType(BaseModel):
    status: Literal["success", "error"] = "success"
    url: str = Field(description="The URL to redirect the user to")


class ErrorType(BaseModel):
    status: Literal["success", "error"] = "error"
    error_message: str = Field(description="The error message if any")


class AbstractOauthBaseClient(metaclass=ABCMeta):
    @abstractmethod
    def get_url(self) -> UrlType | ErrorType:
        pass

    @abstractmethod
    def construct_url_for_code_token_exchange(self, code: str):
        pass

    # @abstractmethod
    # def refresh_token(self, refresh_token: str):
    #     pass

    @abstractmethod
    async def exchange_code_for_token(self, code: str):
        pass

    @property
    @abstractmethod
    def scopes(self):
        pass
