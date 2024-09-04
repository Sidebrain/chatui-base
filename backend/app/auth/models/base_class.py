from sqlalchemy.ext.declarative import as_declarative, declared_attr, declarative_base
from sqlalchemy import Column, Integer, MetaData
from sqlalchemy.orm import registry, DeclarativeBase
from sqlalchemy.dialects.postgresql import UUID

import uuid
import os

auth_metadata = MetaData(schema="auth")
# class_registry = registry(metadata=auth_metadata)

IMPORT_PATH = os.path.abspath(os.path.dirname(__file__))


class Base(DeclarativeBase):
    metadata = auth_metadata
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    __name__: str

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()


# @class_registry.as_declarative_base()
# class Base:
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     __name__: str

#     @declared_attr
#     def __tablename__(cls):
#         return cls.__name__.lower()


if __name__ == "__main__":
    print(Base.metadata)
    print(dir(Base))
