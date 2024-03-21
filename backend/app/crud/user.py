from app.crud.crud_base import CRUDBase

# from app.models.User import User
# from app.schemas.User import UserCreate
from app import models
from app import schemas
from sqlalchemy.orm import Session


class CRUDUser(CRUDBase[models.User, schemas.UserCreate]):
    ...


user = CRUDUser(models.User)
