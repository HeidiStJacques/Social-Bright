from sqlalchemy.orm import Session
from db.models import Client
from schemas.clients import ClientCreate

def get_clients_by_tenant(db: Session, tenant_id: int):
    return db.query(Client).filter(Client.tenant_id == tenant_id).all()

def create_client(db: Session, client: ClientCreate, tenant_id: int) -> Client:
    new_client = Client(**client.dict(), tenant_id=tenant_id)
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client

def get_clients(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Client).offset(skip).limit(limit).all()

def get_client(db: Session, client_id: int):
    return db.query(Client).filter(Client.id == client_id).first()
