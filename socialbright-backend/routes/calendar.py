from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date, datetime
from db.session import get_db
from db.models import CalendarEvent  # assumes this model exists
from routes.auth import get_current_user
from typing import List
from schemas.calendar import CalendarEventResponse
from db import models

router = APIRouter(
    prefix="/tenants/{tenant_id}/clients/{client_id}/calendar-events",
    tags=["Calendar"]
)

@router.get("/upcoming")
def get_upcoming_visits(tenant_id: int, client_id: int, db: Session = Depends(get_db)):
    today = date.today()
    events = (
        db.query(CalendarEvent)
        .filter(
            CalendarEvent.client_id == client_id,
            CalendarEvent.tenant_id == tenant_id,
            CalendarEvent.date >= today
        )
        .order_by(CalendarEvent.date.asc())
        .all()
    )
    return events

router_general = APIRouter(prefix="/calendar-events", tags=["Calendar Events"])

@router_general.get("/upcoming", response_model=List[CalendarEventResponse])
def get_upcoming_events_for_user(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    now = datetime.utcnow()
    events = db.query(CalendarEvent).filter(
        CalendarEvent.created_by == current_user.id,
        CalendarEvent.start_time >= now
    ).order_by(CalendarEvent.start_time.asc()).all()
    

    return events
