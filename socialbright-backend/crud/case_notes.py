from sqlalchemy.orm import Session
from db.models import CaseNote
from schemas.case_notes import CaseNoteCreate

def create_case_note(db: Session, note: CaseNoteCreate) -> CaseNote:
    new_note = CaseNote(**note.dict())
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note

def get_case_notes_by_client(db: Session, client_id: int):
    return db.query(CaseNote).filter(CaseNote.client_id == client_id).all()
