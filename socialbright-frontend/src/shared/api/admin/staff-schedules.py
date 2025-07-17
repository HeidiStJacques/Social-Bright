from fastapi import APIRouter, Query, HTTPException
from typing import List
from datetime import date
from pydantic import BaseModel

# If you have a database session:
# from app.database import get_db
# from sqlalchemy.orm import Session
# from app.models import StaffSchedule

router = APIRouter(
    prefix="/admin",
    tags=["Admin - Staff Schedules"]
)

# Pydantic response schema
class StaffScheduleResponse(BaseModel):
    staff_name: str
    client_name: str
    time: str

@router.get("/staff-schedules", response_model=List[StaffScheduleResponse])
def get_staff_schedules(date: date = Query(...)):
    """
    Get all staff schedules for the specified date.
    Example: GET /admin/staff-schedules?date=2025-07-10
    """

    # 🧪 TODO: Replace this static list with real database logic
    sample_schedules = [
        {"staff_name": "Jane Doe", "client_name": "John Smith", "time": "09:00 AM"},
        {"staff_name": "Mike Lee", "client_name": "Emma Brown", "time": "11:00 AM"},
    ]

    # ✅ In production, you would filter by `date` in your DB like:
    # schedules = db.query(StaffSchedule).filter(StaffSchedule.date == date).all()

    return sample_schedules
