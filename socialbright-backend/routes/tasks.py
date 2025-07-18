from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import Task, User
from schemas.tasks import TaskResponse, TaskCreate, TaskUpdate
from routes.auth import get_current_user
from typing import List
from crud import tasks as crud_tasks
from uuid import UUID

router = APIRouter(tags=["Tasks"])

# Optional: keep this for personal task lists
@router.get("/tasks", response_model=List[TaskResponse])
def get_all_tasks_for_tenant(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Task).filter(Task.tenant_id == current_user.tenant_id).order_by(Task.due_date).all()


# ✅ GET all tasks for a client
@router.get("/clients/{client_id}/tasks", response_model=List[TaskResponse])
def get_tasks_for_client(client_id: int, db: Session = Depends(get_db)):
    return crud_tasks.get_tasks(db, client_id)

# ✅ POST new task for a client
@router.post("/clients/{client_id}/tasks", response_model=TaskResponse)
def create_task_for_client(
    client_id: UUID,
    task: TaskCreate,
    db: Session = Depends(get_db)
):
    return crud_tasks.create_task(db, client_id, task)

# ✅ PUT update task
@router.put("/clients/{client_id}/tasks/{task_id}", response_model=TaskResponse)
def update_task(
    client_id: UUID,
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db)
):
    return crud_tasks.update_task(db, task_id, task)

# ✅ DELETE task
@router.delete("/clients/{client_id}/tasks/{task_id}")
def delete_task(client_id: UUID, task_id: int, db: Session = Depends(get_db)):
    crud_tasks.delete_task(db, task_id)
    return {"detail": "Task deleted"}
