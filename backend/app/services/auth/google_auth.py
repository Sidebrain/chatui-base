from collections import namedtuple
import os
from typing import Literal, NamedTuple
from pydantic import BaseModel, Field
from fastapi.responses import RedirectResponse
from furl import furl
import requests

import logging

logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)   # this is set globally, change if you want to test
fh = logging.FileHandler(f"logs/{__name__}.log")
fh2 = logging.FileHandler("logs/app.log")
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
fh.setFormatter(formatter)
fh2.setFormatter(formatter)
logger.addHandler(fh)

google_oauth_url = "https://accounts.google.com/o/oauth2/v2/auth"


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
    include_granted_scopes: str = Field(
        default=True,
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


class GoogleOauth:
    def __init__(self) -> None:
        self.parent_url = furl(google_oauth_url)

    def redirect_to_google_oauth_server(
        self,
        # request: GoogleAuthRequest
    ):
        # construct the google oauth url
        auth_url = self.parent_url.copy()

        params = GoogleAuthRequest(
            client_id=os.getenv("GOOGLE_CLIENT_ID"),
            redirect_uri="http://localhost:8008/auth/callback",
            access_type="offline",
            scope=" ".join(
                [
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "openid",
                ]
            ),
            response_type="code",
            state="123456789",
            include_granted_scopes="true",
        )

        auth_url.args = params.model_dump()
        logger.debug("auth_url = ", auth_url.url)

        # redirect to google oauth server
        return {"url": auth_url.url}

    def exchange_code_for_token(self, code: str):
        logger.debug("exchanging code for token")
        token_url = furl("https://oauth2.googleapis.com/token")
        request_params = ExchangeTokenRequest(
            client_id=os.getenv("GOOGLE_CLIENT_ID"),
            client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
            code=code,
            redirect_uri="http://localhost:8008/auth/callback",
            grant_type="authorization_code",
        )
        token_url.args = request_params.model_dump()
        logger.debug("url for exchanging tokens = ", token_url.url)
        return requests.post(token_url.url)


if __name__ == "__main__":
    google_oauth = GoogleOauth()
    google_oauth.redirect_to_google_oauth_server()
