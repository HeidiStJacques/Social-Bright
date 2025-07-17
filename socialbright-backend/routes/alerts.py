from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from datetime import datetime, timedelta
from db.session import get_db
from db.models import Client, CalendarEvent, CaseNote, User
from routes.auth import get_current_user
from typing import Dict

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("/", response_model=Dict[str, int])
def get_alerts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    today = datetime.utcnow().date()
    days_30_ago = today - timedelta(days=30)
    days_60_ago = today - timedelta(days=60)

    # Get all clients assigned to this user's tenant
    clients = db.query(Client).filter(Client.tenant_id == current_user.tenant_id).all()

    alert_count = 0

    for client in clients:
        client_id = client.id

        # Most recent contact (case note OR calendar event)
        last_contact = db.query(func.max(func.greatest(
            func.coalesce(
                db.query(func.max(CaseNote.created_at))
                .filter(CaseNote.client_id == client_id)
                .scalar_subquery(),
                datetime(1900, 1, 1)
            ),
            func.coalesce(
                db.query(func.max(CalendarEvent.start_time))
                .filter(CalendarEvent.client_id == client_id)
                .scalar_subquery(),
                datetime(1900, 1, 1)
            )
        ))).scalar()

        # Most recent home visit only
        last_home_visit = db.query(func.max(CalendarEvent.start_time)).filter(
            CalendarEvent.client_id == client_id,
            CalendarEvent.event_type == "Home Visit"
        ).scalar()

        if not last_contact or last_contact.date() < days_30_ago:
            alert_count += 1
        elif not last_home_visit or last_home_visit.date() < days_60_ago:
            alert_count += 1

    return {
        "alerts": alert_count
    }
