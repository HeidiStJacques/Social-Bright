from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dependencies.auth import get_db
from dependencies.auth import get_current_user
from db.models import User    # SQLAlchemy model
from db.models import Client, Eligibility
from fastapi.responses import StreamingResponse
from io import StringIO

import pandas as pd

router = APIRouter()

@router.get("/api/reports/eligibility-status")
def get_eligibility_status_report(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    results = []
    clients = db.query(Client).filter(Client.tenant_id == user.tenant_id).all()
    for client in clients:
        eligibility = db.query(Eligibility).filter_by(client_id=client.id).first()
        results.append({
            "client_id": client.id,
            "name": f"{client.first_name} {client.last_name}",
            "eligibility_status": eligibility.status if eligibility else "Unknown"
        })
    return results

@router.get("/api/reports/eligibility-status/export")
def export_eligibility_status_csv(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    clients = db.query(Client).filter(Client.tenant_id == user.tenant_id).all()
    rows = []
    for client in clients:
        eligibility = db.query(Eligibility).filter_by(client_id=client.id).first()
        rows.append({
            "Client ID": client.id,
            "Name": f"{client.first_name} {client.last_name}",
            "Eligibility Status": eligibility.status if eligibility else "Unknown"
        })
    df = pd.DataFrame(rows)
    csv_stream = StringIO()
    df.to_csv(csv_stream, index=False)
    csv_stream.seek(0)
    return StreamingResponse(csv_stream, media_type="text/csv", headers={
        "Content-Disposition": "attachment; filename=eligibility_status.csv"
    })
