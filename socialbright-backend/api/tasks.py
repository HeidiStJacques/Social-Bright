from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import Task, Client
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
    return [
        TaskResponse(
            id=task.id,
            client_id=task.client_id,
            client_name="",  # optional: add join for name if needed
            task=task.task,
            due_date=task.due_date,
            status=task.status,
            view=task.view,
            subtasks=task.subtasks or []
        )
        for task in tasks
    ]

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
        subtasks=task.subtasks or [],
        view='client'
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return TaskResponse(
        id=new_task.id,
        client_id=new_task.client_id,
        client_name="",  # optional
        task=new_task.task,
        due_date=new_task.due_date,
        status=new_task.status,
        view=new_task.view,
        subtasks=new_task.subtasks or []
    )

@router.get("/tasks", response_model=List[TaskResponse])
def get_all_tasks_for_tenant(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    tasks = (
        db.query(Task, Client.first_name, Client.last_name)
        .outerjoin(Client, Task.client_id == Client.id)
        .filter(Task.tenant_id == user.tenant_id)
        .all()
    )

    return [
        TaskResponse(
            id=task.id,
            client_id=task.client_id,
            client_name=(f"{first} {last}".strip() if first else "General"),
            task=task.task,
            due_date=task.due_date,
            status=task.status,
            view=task.view or "client",
            subtasks=task.subtasks or []
        )
        for (task, first, last) in tasks
 ]

@router.post("/tasks", response_model=TaskResponse)
def create_task_for_tenant(
    task: TaskCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    new_task = Task(
    client_id=task.client_id,
    tenant_id=user.tenant_id,
    user_id=user.id,
    task=task.task,
    status=task.status,
    due_date=task.due_date,
    subtasks=task.subtasks or [],
    view='client',
    client_name=''  # added!
)

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return TaskResponse(
        id=new_task.id,
        client_id=new_task.client_id,
        client_name="",
        task=new_task.task,
        due_date=new_task.due_date,
        status=new_task.status,
        view=new_task.view,
        subtasks=new_task.subtasks or []
    )
   

