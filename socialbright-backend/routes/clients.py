# app/routers/clients.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from routes.auth import get_current_user  # ✅ make sure this returns a User with tenant_id
from db import models
from crud import clients as crud_clients
from crud import case_notes as crud_case_notes
from schemas import clients as schemas
from schemas import case_notes as schemas_case_notes

router = APIRouter(prefix="/clients", tags=["Clients"])


# ✅ Get clients for current user's tenant
@router.get("/", response_model=list[schemas.ClientResponse])
def get_clients_for_tenant(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud_clients.get_clients_by_tenant(db, current_user.tenant_id)


# ✅ Create a new client (auto-assign tenant)
@router.post("/", response_model=schemas.ClientResponse)
def create_client(
    client_data: schemas.ClientCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    client = models.Client(
        **client_data.dict(),
        tenant_id=current_user.tenant_id
    )
    db.add(client)
    db.commit()
    db.refresh(client)
    return client


# ✅ Add a case note for a client
@router.post("/{client_id}/case-notes", response_model=schemas_case_notes.CaseNoteRead)
def create_case_note_for_client(
    client_id: int,
    note: schemas_case_notes.CaseNoteCreate,
    db: Session = Depends(get_db)
):
    return crud_case_notes.create_case_note(db=db, note=note, client_id=client_id)


# ✅ Get case notes for a client
@router.get("/{client_id}/case-notes", response_model=list[schemas_case_notes.CaseNoteRead])
def read_case_notes_for_client(
    client_id: int,
    db: Session = Depends(get_db)
):
    notes = crud_case_notes.get_case_notes_by_client(db, client_id=client_id)
    if notes is None:
        raise HTTPException(status_code=404, detail="No case notes found")
    return notes
