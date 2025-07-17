from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from db.session import get_db
from db.models import CalendarEvent, Client
from schemas.dashboard import VisitResponse
from typing import List
from dependencies.auth import get_current_user

router = APIRouter()

def get_current_tenant_id(user = Depends(get_current_user)) -> int:
    return user.tenant_id

@router.get("/visits", response_model=List[VisitResponse])
def get_visits(
    db: Session = Depends(get_db),
    tenant_id: int = Depends(get_current_tenant_id)
):
    visits = (
        db.query(CalendarEvent, Client.first_name, Client.last_name)
        .join(Client, CalendarEvent.client_id == Client.id)
        .filter(CalendarEvent.start_time >= func.now())
        .filter(Client.tenant_id == tenant_id)
        .order_by(CalendarEvent.start_time.asc())
        .all()
    )

    return [
        {
            "id": event.id,
            "client_id": event.client_id,
            "client_name": f"{first_name} {last_name}",
            "title": event.title,
            "description": event.description,
            "start_time": event.start_time,
            "end_time": event.end_time,
        }
        for event, first_name, last_name in visits
    ]
