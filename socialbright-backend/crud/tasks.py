from sqlalchemy.orm import Session
from db.models import Task
from schemas.tasks import TaskCreate, TaskUpdate
from uuid import UUID

def get_tasks(db: Session, client_id: UUID):
    return db.query(Task).filter(Task.client_id == client_id).all()

def create_task(db: Session, client_id: UUID, task: TaskCreate):
    db_task = Task(**task.dict(), client_id=client_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task_data: TaskUpdate):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        return None
    for key, value in task_data.dict(exclude_unset=True).items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
