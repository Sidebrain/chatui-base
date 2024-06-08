from fastapi import Request
import httpx
from pydantic import BaseModel, Field, ValidationError
from furl import furl

import os
from typing import Literal
import logging

from app.auth.abstract_base import AbstractOauthBaseClient, UrlType, ErrorType

logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)   # this is set globally, change if you want to test
fh = logging.FileHandler(f"logs/{__name__}.log")
fh2 = logging.FileHandler("logs/app.log")
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
fh.setFormatter(formatter)
# fh.setLevel(logging.DEBUG)
fh2.setFormatter(formatter)
# fh2.setLevel(logging.DEBUG)
logger.addHandler(fh)
logger.addHandler(fh2)

google_oauth_url = "https://accounts.google.com/o/oauth2/v2/auth"
token_exchange_url = "https://oauth2.googleapis.com/token"


class GoogleAuthRequest(BaseModel):
    client_id: str = Field(description="Client ID from Google Developer Console")
    redirect_uri: str = Field(
        description="Users will be redirected to this path after they have authenticated"
    )
    response_type: str = Field(
        default="code",
        description="Determines whether the Google OAuth 2.0 endpoint returns an authorization code.",
    )
    scope: str = Field(
        description="A space-delimited list of scopes that identify the resources that your application could access on the user's behalf. These values inform the consent screen that Google displays to the user."
    )
    access_type: Literal["offline", "online"] = Field(
        description="Determines whether the application can refresh a user's token when the user is not present at the browser."
    )
    state: str = Field(
        description="An opaque value used by the client to maintain state between the request and callback. The authorization server includes this value when redirecting the user-agent back to the client.",
    )
    include_granted_scopes: Literal["true", "false"] = Field(
        default="true",
        description="Enables applications to use incremental authorization to request access to additional scopes in context.",
    )


class ExchangeTokenRequest(BaseModel):
    client_id: str = Field(description="Client ID from Google Developer Console")
    client_secret: str = Field(
        description="Client Secret from Google Developer Console"
    )
    code: str = Field(
        description="The authorization code returned from the initial request to the Google OAuth 2.0 endpoint"
    )
    redirect_uri: str = Field(
        description="Users will be redirected to this path after they have authenticated"
    )
    grant_type: Literal["authorization_code"] = Field(
        description="Determines whether the Google OAuth 2.0 endpoint returns an authorization code.",
    )


class GoogleOauthClient(AbstractOauthBaseClient):
    def __init__(
        self,
        client_id: str,
        client_secret: str,
        redirect_uri: str,
        oauth_url: str,
        token_exchange_url: str,
        access_type: str = "offline",
        response_type: str = "code",
        include_granted_scopes: str = "true",
    ) -> None:
        self.client_id = client_id
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri
        self.oauth_url = oauth_url
        self.access_type = access_type
        self.response_type = response_type
        self.include_granted_scopes = include_granted_scopes
        self.token_exchange_url = token_exchange_url

    def get_url(self, local_generated_state: str = "abs29384") -> UrlType | ErrorType:
        # furl is a more intuitive way of dealing with urls than urllib
        try:
            # TODO this will never error, need to make sure the right url is passed, maybe check furl.host?
            auth_url = furl(self.oauth_url)
            logger.debug(f"auth_url is {auth_url}")
            params = GoogleAuthRequest(
                client_id=self.client_id,
                redirect_uri=self.redirect_uri,
                access_type=self.access_type,
                scope=" ".join(self.scopes),
                response_type=self.response_type,
                state=local_generated_state,
                include_granted_scopes=self.include_granted_scopes,
            )
            # add the params to the url
            auth_url.args = params.model_dump()
            return UrlType(url=auth_url.url)

        except ValidationError as e:
            logger.error(
                f"Pydantic validation of GoogleAuthRequest type that sets the params for the url failed. \n {e}"
            )
            return ErrorType(error_message=f"Pydantic validation error {e}")
        except Exception as e:
            logger.error(f"url does not seem to be of valid type {e}")
            return ErrorType(error_message=f"url does not seem to be of valid type {e}")

    def construct_url_for_code_token_exchange(self, code: str):
        token_url = furl(self.token_exchange_url)
        params = ExchangeTokenRequest(
            client_id=self.client_id,
            client_secret=self.client_secret,
            code=code,
            redirect_uri=self.redirect_uri,
            grant_type="authorization_code",
        )
        token_url.args = params.model_dump()
        return token_url.url

    async def exchange_code_for_token(self, code: str):
        url = self.construct_url_for_code_token_exchange(code)
        # simpley completes the exchange of the code for the token
        # the response is received at the callback url
        async with httpx.AsyncClient() as client:
            try:
                return await client.post(url)
            except Exception as e:
                logger.error(f"Error in exchange_code_for_token {e}")
                return ErrorType(error_message=f"Error in exchange_code_for_token {e}")

    def refresh_token(self, refresh_token: str): ...

    async def handle_callback(self, request: Request):
        url = furl(request.url)
        # if code then exchange for token
        # if token then store in db
        if "error" in url.args:
            logger.debug(f"error in user auth received - url params {url.args}")
            return {"message": "Error", "details": url.args["error"]}

        if "code" in url.args:
            logger.debug(f"successful user auth received - url params {url.args}")
            code = url.args["code"]
            response = await self.exchange_code_for_token(code)
            logger.debug(f"access token received {response.content.decode()}")
            return {
                "message": "Success",
                "details": "Code received and exchanged for token",
            }

        if ("access_token" in url.args) or ("id_token" in url.args):
            logger.debug(f"code exchanged token received - url params\n{url.args}")
            return {"message": "Success", "details": "Token received and stored in db"}

    async def store_tokens_in_db(self, tokens: dict):
        pass

    @property
    def scopes(self):
        return [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/youtube",
            "openid",
        ]


google_oauth_client = GoogleOauthClient(
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    redirect_uri=os.getenv("GOOGLE_REDIRECT_URI"),
    oauth_url=google_oauth_url,
    token_exchange_url=token_exchange_url,
)
