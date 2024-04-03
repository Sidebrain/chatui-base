from fastapi.encoders import jsonable_encoder
from app.crud.crud_base import CRUDBase

# from app.models.message import Message
# from app.schemas.message import MessageCreate
from app import models
from app import schemas
from sqlalchemy.orm import Session
from sqlalchemy import select, insert

import logging

logger = logging.getLogger(__name__)


class CRUDConversation(CRUDBase[models.Conversation, schemas.ConversationCreate]):
    def get_all_conversations_by_user_id(self, db: Session, user_id: int):
        logger.debug(f"Retrieving all conversations for user_id: {user_id}")
        stmt = (
            select(self.model)
            .where(self.model.owner_id == user_id)
            .order_by(self.model.updated_at.desc())
        )
        return db.execute(stmt).scalars().all()

    def get_empty_conversations_by_user_id(self, db: Session, user_id: int):

        stmt = (
            select(self.model)
            .where(self.model.owner_id == user_id)  # get all conversations by user
            .where(~self.model.messages.any())  # where the conversation has no messages
        )

        return db.execute(stmt).scalars().first()

    def create_conversation_or_return_empty(
        self, db: Session, user_id: int
    ) -> models.Conversation:
        """This query handles the following cases:
        - If the user_id has no conversations of 0 length, create a new conversation
        - if the user_id has a conversation of 0 length, return that conversation

        Args:
            db (Session): Session object to interact with the database
            user_id (int): User's id who is accessing the system

        Returns:
            models.Conversation: _description_
        """
        # check if an empty conversation for that user already exists
        # if yes, return that as the conversation
        available_empty_conv_obj = self.get_empty_conversations_by_user_id(db, user_id)

        if not available_empty_conv_obj:
            logger.debug(
                f"No empty conversation, Creating a new empty conversation for user_id: {user_id}"
            )
            return self.create(db, obj_in=schemas.ConversationCreate(owner_id=user_id))
        else:
            logger.debug(f"Empty conversation found for user_id: {user_id}")
            return available_empty_conv_obj

    def get(self, db: Session, id: int | None):
        if not id:
            logger.debug("No id provided, returning empty conversation thread for user")
            return self.create_conversation_or_return_empty(db, user_id=id)
        else:
            logger.debug(f"Retreiving conversation with id: {id}")
            stmt = select(self.model).where(self.model.id == id)
        return db.execute(stmt).scalars().first()


conversation = CRUDConversation(models.Conversation)
