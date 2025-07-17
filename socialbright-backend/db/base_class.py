# db/base_class.py

from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.orm import declared_attr as orm_declared_attr

@as_declarative()
class Base:
    id: any
    __name__: str

    # Default table name = class name in lowercase
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

    # Optional: Default schema if not overridden
    @orm_declared_attr
    def __table_args__(cls):
        return {'schema': 'clients'}  # default — can be overridden per model
