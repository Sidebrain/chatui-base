import logging
from furl import furl
from pprint import pprint

from fastapi import APIRouter, HTTPException, Request

from app.auth.abstract_base import UrlType
from app.auth import google_oauth_client

# the log level is being set globally via basicConfig in main.py, use this overwrite but revert back after youre done testing
logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
fh = logging.FileHandler("logs/app.log")
fh2 = logging.FileHandler(f"logs/{__name__}.log")
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
fh.setFormatter(formatter)
fh2.setFormatter(formatter)
logger.addHandler(fh)
logger.addHandler(fh2)

router = APIRouter(
    prefix="/auth",
)


@router.get("/login", status_code=200)
async def login(provider: str = "google") -> UrlType:
    match provider:
        case "google":
            response = google_oauth_client.get_url()
            if response.status == "error":
                return HTTPException(status_code=422, detail=response.error_message)
            url_to_redirect_to = response
            return url_to_redirect_to


@router.get("/callback", status_code=200)
async def callback(
    request: Request,
) -> dict:
    logger.debug("callback route hit")
    # if code then exchange for token
    # if token then store in db
    response = await google_oauth_client.handle_callback(request)
    print(response)
    return response
