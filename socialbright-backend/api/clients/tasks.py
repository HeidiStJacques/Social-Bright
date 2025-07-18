from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import Task
from schemas.tasks import TaskCreate, TaskResponse
from typing import List
from dependencies.auth import get_current_user

router = APIRouter()

@router.get("/clients/{client_id}/tasks", response_model=List[TaskResponse])
def get_client_tasks(
    client_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    tasks = db.query(Task).filter(Task.client_id == client_id).all()
    return tasks

@router.post("/clients/{client_id}/tasks", response_model=TaskResponse)
def create_client_task(
    client_id: int,
    task: TaskCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    new_task = Task(
        client_id=client_id,
        tenant_id=user.tenant_id,
        user_id=user.id,
        task=task.task,
        status=task.status,
        due_date=task.due_date,
        subtasks=task.subtasks,
        view='client'
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.get("/tasks", response_model=List[TaskResponse])
def get_all_tasks_for_tenant(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return db.query(Task).filter(Task.tenant_id == user.tenant_id).all()

