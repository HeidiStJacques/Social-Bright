from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dependencies.auth import get_db
from dependencies.auth import get_current_user
from db.models import User   # SQLAlchemy model
from db.models import Client
from db.models import PlanOfCare
from fastapi.responses import StreamingResponse
import pandas as pd
from io import StringIO

router = APIRouter()

@router.get("/api/reports/plan-of-care-status")
def get_plan_of_care_status(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    results = []
    clients = db.query(Client).filter(Client.tenant_id == user.tenant_id).all()

    for client in clients:
        latest_plan = (
            db.query(PlanOfCare)
            .filter_by(client_id=client.id)
            .order_by(PlanOfCare.created_at.desc())
            .first()
        )

        results.append({
            "client_id": client.id,
            "name": f"{client.first_name} {client.last_name}",
            "last_plan_date": latest_plan.created_at.strftime("%Y-%m-%d") if latest_plan else "None",
            "status": "Complete" if latest_plan and latest_plan.is_complete else "Incomplete"
        })

    return results

@router.get("/api/reports/plan-of-care-status/export")
def export_plan_of_care_status_csv(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    clients = db.query(Client).filter(Client.tenant_id == user.tenant_id).all()
    rows = []

    for client in clients:
        latest_plan = (
            db.query(PlanOfCare)
            .filter_by(client_id=client.id)
            .order_by(PlanOfCare.created_at.desc())
            .first()
        )

        rows.append({
            "Client ID": client.id,
            "Name": f"{client.first_name} {client.last_name}",
            "Last Plan Date": latest_plan.created_at.strftime("%Y-%m-%d") if latest_plan else "None",
            "Status": "Complete" if latest_plan and latest_plan.is_complete else "Incomplete"
        })

    df = pd.DataFrame(rows)
    csv_stream = StringIO()
    df.to_csv(csv_stream, index=False)
    csv_stream.seek(0)

    return StreamingResponse(csv_stream, media_type="text/csv", headers={
        "Content-Disposition": "attachment; filename=plan_of_care_status.csv"
    })
