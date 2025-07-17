from fastapi import APIRouter
from typing import List
from pydantic import BaseModel
from datetime import date

router = APIRouter(
    prefix="/admin",
    tags=["Admin - Overdue Tasks"]
)

class OverdueTask(BaseModel):
    task: str
    due: date

@router.get("/overdue-tasks", response_model=List[OverdueTask])
def get_overdue_tasks():
    """
    Return a list of overdue tasks.
    """
    # Replace with real DB logic
    sample_tasks = [
        {"task": "Submit Eligibility Form for Sarah Lee", "due": "2025-07-07"},
        {"task": "Case Note for Emma Brown", "due": "2025-07-08"}
    ]
    return sample_tasks
