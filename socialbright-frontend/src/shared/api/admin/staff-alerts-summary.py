from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter(
    prefix="/admin",
    tags=["Admin - Staff Alerts Summary"]
)

class StaffSummary(BaseModel):
    name: str
    alerts: int
    overdueTasks: int

@router.get("/staff-alerts-summary", response_model=List[StaffSummary])
def get_staff_alerts_summary():
    """
    Return number of alerts and overdue tasks per staff member.
    """
    # Replace with real DB logic
    sample_summaries = [
        {"name": "Jane Doe", "alerts": 2, "overdueTasks": 1},
        {"name": "Mike Lee", "alerts": 0, "overdueTasks": 3}
    ]
    return sample_summaries
