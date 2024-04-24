from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.crud_base import CRUDBase
from app import models
from app import schemas


class CRUDLLM(CRUDBase[models.LLM, schemas.LLMCreate]):

    def get_all_available_llms(
        self,
        db: Session,
    ) -> list[models.LLM]:
        stmt = select(self.model)
        return db.execute(stmt).scalars().all()

    pass


llm = CRUDLLM(models.LLM)
