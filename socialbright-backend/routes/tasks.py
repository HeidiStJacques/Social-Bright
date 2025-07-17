from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import Task, User
from schemas.tasks import TaskResponse
from routes.auth import get_current_user
from typing import List

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=List[TaskResponse])
def get_user_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    tasks = db.query(Task).filter(Task.user_id == current_user.id).order_by(Task.due_date).all()
    return tasks

