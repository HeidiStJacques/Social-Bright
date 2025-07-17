from fastapi import APIRouter
from typing import List
from pydantic import BaseModel
from datetime import date

router = APIRouter(
    prefix="/admin",
    tags=["Admin - Alerts"]
)

class Alert(BaseModel):
    message: str
    date: date

@router.get("/alerts", response_model=List[Alert])
def get_all_alerts():
    """
    Return all system/client alerts.
    """
    # Replace with real DB logic
    sample_alerts = [
        {"message": "MEA overdue for John Smith", "date": "2025-07-09"},
        {"message": "Visit missed for Emma Brown", "date": "2025-07-10"}
    ]
    return sample_alerts
