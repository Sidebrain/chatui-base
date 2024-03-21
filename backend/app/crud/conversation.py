from app.crud.crud_base import CRUDBase

# from app.models.message import Message
# from app.schemas.message import MessageCreate
from app import models
from app import schemas
from sqlalchemy.orm import Session


class CRUDConversation(CRUDBase[models.Conversation, schemas.ConversationCreate]):
    ...


conversation = CRUDConversation(models.Conversation)
