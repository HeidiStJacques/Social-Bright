from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from db.session import get_db
from db.models import CalendarEvent, Task, Alert, Client
from schemas.dashboard import VisitResponse, TaskResponse, AlertResponse
from routes.auth import get_current_user  # ✅ Match what clients.py uses


# ✅ Removed prefix here
router = APIRouter(tags=["Dashboard"])

# ✅ Real tenant logic
def get_current_user_tenant_id(user = Depends(get_current_user)):
    return user.tenant_id

@router.get("/visits", response_model=List[VisitResponse])
def get_upcoming_visits(db: Session = Depends(get_db), tenant_id: int = Depends(get_current_user_tenant_id)):
    visits = (
        db.query(CalendarEvent, Client.first_name, Client.last_name)
        .join(Client, CalendarEvent.client_id == Client.id)
        .filter(CalendarEvent.tenant_id == tenant_id)
        .filter(CalendarEvent.start_time >= func.now())
        .order_by(CalendarEvent.start_time.asc())
        .all()
    )

    return [
        {
            "id": event.id,
            "client_id": event.client_id,
            "client_name": f"{first} {last}",
            "title": event.title,
            "description": event.description,
            "start_time": event.start_time,
            "end_time": event.end_time,
        }
        for event, first, last in visits
    ]

@router.get("/tasks", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db), tenant_id: int = Depends(get_current_user_tenant_id)):
    tasks = (
        db.query(Task)
        .filter(Task.tenant_id == tenant_id)
        .filter(Task.status != "Done")
        .order_by(Task.due_date.asc())
        .all()
    )
    return tasks

@router.get("/alerts", response_model=List[AlertResponse])
def get_alerts(db: Session = Depends(get_db), tenant_id: int = Depends(get_current_user_tenant_id)):
    alerts = (
        db.query(Alert)
        .filter(Alert.tenant_id == tenant_id)
        .filter(Alert.is_active == True)
        .order_by(Alert.created_at.desc())
        .all()
    )
    return alerts
