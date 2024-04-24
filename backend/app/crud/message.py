from typing import List

from fastapi.encoders import jsonable_encoder
from app.crud.crud_base import CRUDBase

# from app.models.message import Message
# from app.schemas.message import MessageCreate
from app import models
from app import schemas
from sqlalchemy.orm import Session
from sqlalchemy import select

import logging

logger = logging.getLogger(__name__)


class CRUDMessage(CRUDBase[models.Message, schemas.MessageCreate]):
    """_summary_
    subclass of CRUDBase with default methods to Create, Read, Update, Delete (CRUD).
    init method initializes the CRUD object with a SQLAlchemy model class
    hence here, model is of type models.Message

    Args:
        CRUDBase (_type_): _description_
    """

    def create_multiple(
        self, db: Session, obj_in: List[schemas.MessageCreate], return_
    ) -> list[models.Message]:
        conv_id_of_thread = set([obj.conv_id for obj in obj_in])

        # three cases:
        # 1. all messages belong to the same conversation   -> add to conversation
        # 2. messages have no conversation id  -               -> create a new conversation
        # 3. message has different conversation ids         -> raise error

        if len(conv_id_of_thread) > 1:
            raise ValueError("All messages must belong to the same conversation")
        if conv_id_of_thread:
            raise ValueError("All messages must belong to a conversation")
        else:
            db_objs = [
                self.model(**jsonable_encoder(obj_in_data)) for obj_in_data in obj_in
            ]
            db.add_all(db_objs)
            db.commit()
            refreshed_objs = (
                db.query(self.model)
                .filter(self.model.conv_id == conv_id_of_thread)
                .all()
            )
            return refreshed_objs

    def add_message_to_conversation(
        self, db: Session, user_id: int, conv_id: int, msg_in: schemas.MessageCreate
    ) -> models.Message:
        logger.debug(f"Adding message to conversation for conv_id: {msg_in.conv_id}")
        if msg_in.conv_id != conv_id:
            raise ValueError("Conversation id mismatch")
        db_message = self.create(db=db, obj_in=msg_in)

        return db_message

    def get_messages_by_conversation_id(self, db: Session, conv_id: int):
        stmt = (
            select(self.model)
            .where(self.model.conv_id == conv_id)
            .order_by(self.model.created_at.asc())
        )
        return db.execute(stmt).scalars().all()


message = CRUDMessage(models.Message)
