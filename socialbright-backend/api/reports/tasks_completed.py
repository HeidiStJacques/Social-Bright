from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from dependencies.auth import get_current_user
from dependencies.auth import get_db
from db.models import User   # SQLAlchemy model
from db.models import Client
from db.models import Task

import pandas as pd
from io import StringIO

router = APIRouter()

@router.get("/api/reports/tasks-completed")
def get_tasks_completed_report(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    results = []
    clients = db.query(Client).filter(Client.tenant_id == user.tenant_id).all()

    for client in clients:
        completed_count = db.query(Task).filter_by(client_id=client.id, status="Done").count()
        results.append({
            "client_id": client.id,
            "name": f"{client.first_name} {client.last_name}",
            "completed_tasks": completed_count
        })

    return results

@router.get("/api/reports/tasks-completed/export")
def export_tasks_completed_csv(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    clients = db.query(Client).filter(Client.tenant_id == user.tenant_id).all()
    rows = []

    for client in clients:
        completed_count = db.query(Task).filter_by(client_id=client.id, status="Done").count()
        rows.append({
            "Client ID": client.id,
            "Name": f"{client.first_name} {client.last_name}",
            "Completed Tasks": completed_count
        })

    df = pd.DataFrame(rows)
    csv_stream = StringIO()
    df.to_csv(csv_stream, index=False)
    csv_stream.seek(0)

    return StreamingResponse(csv_stream, media_type="text/csv", headers={
        "Content-Disposition": "attachment; filename=tasks_completed.csv"
    })
