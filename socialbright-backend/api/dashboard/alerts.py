from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import Task, Client
from schemas.dashboard import TaskResponse
from typing import List
from dependencies.auth import get_current_user

router = APIRouter()

def get_current_tenant_id(user = Depends(get_current_user)) -> int:
    return user.tenant_id

@router.get("/tasks", response_model=List[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db),
    tenant_id: int = Depends(get_current_tenant_id)
):
    tasks = (
        db.query(Task, Client.first_name, Client.last_name)
        .join(Client, Task.client_id == Client.id)
        .filter(Task.tenant_id == tenant_id)
        .filter(Task.status != "Done")
        .order_by(Task.due_date.asc())
        .all()
    )

    return [
        {
            "id": task.Task.id,
            "client_id": task.Task.client_id,
            "client_name": f"{task.first_name} {task.last_name}",
            "title": task.Task.title,
            "due_date": task.Task.due_date,
            "status": task.Task.status,
        }
        for task in tasks
    ]
