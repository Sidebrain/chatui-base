from app.crud.crud_base import CRUDBase

# from app.models.message import Message
# from app.schemas.message import MessageCreate
from app import models
from app import schemas
from sqlalchemy.orm import Session


class CRUDMessage(CRUDBase[models.Message, schemas.MessageCreate]):
    ...


message = CRUDMessage(models.Message)
