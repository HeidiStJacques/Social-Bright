from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import Client

router = APIRouter(
    prefix="/tenants/{tenant_id}/clients",
    tags=["Tenant Clients"]
)

@router.get("/{client_id}/demographics")
def get_demographics(tenant_id: str, client_id: int, db: Session = Depends(get_db)):
    client = db.query(Client).filter_by(id=client_id, tenant_id=tenant_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

