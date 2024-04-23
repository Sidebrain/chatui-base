from app.crud.crud_base import CRUDBase

from app import models
from app import schemas


class CRUDLLM(CRUDBase[models.LLM, schemas.LLMCreate]):
    pass


llm = CRUDLLM(models.LLM)
