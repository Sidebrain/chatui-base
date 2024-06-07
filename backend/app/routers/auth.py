import logging
from typing import Any
from furl import furl
from pprint import pprint

from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse

from app.services.auth.google_auth import GoogleOauth
from app.services.supabase_client import get_supabase_client
from supabase import Client

# the log level is being set globally via basicConfig in main.py, use this overwrite but revert back after youre done testing
logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
fh = logging.FileHandler("logs/app.log")
# fh.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
fh.setFormatter(formatter)
logger.addHandler(fh)

router = APIRouter(
    prefix="/auth",
)

g = GoogleOauth()


@router.get("/login", status_code=200)
async def login() -> dict:
    return g.redirect_to_google_oauth_server()


@router.get("/callback", status_code=200)
async def callback(
    request: Request,
) -> dict:
    logger.debug("callback route hit")
    url = furl(request.url)
    logger.debug("url params", *url.args)
    print("url params", *url.args, sep="\n")
    # if code then exchange for token
    # if token then store in db
    try:
        code = url.args["code"]
        logger.debug("code", code)
        val = g.exchange_code_for_token(code)
        pprint(val.content, indent=4)
        return {"message": "Success"}
    except Exception as e:
        logger.error(e)
        return {"message": f"Error {e}"}