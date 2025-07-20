from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from io import StringIO
from dependencies.auth import get_current_user
from dependencies.auth import get_db
from db.models import User   # SQLAlchemy model


import pandas as pd

router = APIRouter()

@router.get("/api/reports/export")
def export_report(
    report_type: str = Query(..., enum=[
        "client-summary", "demographics", "eligibility-status", "tasks-completed", "missing-documents"
    ]),
    format: str = Query("csv", enum=["csv"]),
    client_id: int = Query(None),
    status: str = Query(None),
    start_date: str = Query(None),
    end_date: str = Query(None),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    df = pd.DataFrame()

    # --- Client Summary ---
    if report_type == "client-summary":
        query = """
            SELECT c.id, c.first_name, c.last_name, d.date_of_birth
            FROM clients.clients c
            JOIN clients.demographics d ON c.id = d.client_id
            WHERE c.tenant_id = :tenant_id
        """
        params = {"tenant_id": user.tenant_id}
        if client_id:
            query += " AND c.id = :client_id"
            params["client_id"] = client_id
        if status:
            query += " AND c.status = :status"
            params["status"] = status

        rows = db.execute(query, params).fetchall()
        df = pd.DataFrame(rows, columns=["ID", "First Name", "Last Name", "Date of Birth"])

    # --- Demographics ---
    elif report_type == "demographics":
        query = """
            SELECT c.id, c.first_name, c.last_name, d.date_of_birth, d.gender, d.language
            FROM clients.clients c
            JOIN clients.demographics d ON c.id = d.client_id
            WHERE c.tenant_id = :tenant_id
        """
        params = {"tenant_id": user.tenant_id}
        if client_id:
            query += " AND c.id = :client_id"
            params["client_id"] = client_id
        if status:
            query += " AND c.status = :status"
            params["status"] = status

        rows = db.execute(query, params).fetchall()
        df = pd.DataFrame(rows, columns=["ID", "First Name", "Last Name", "Date of Birth", "Gender", "Language"])

    # --- Eligibility Status ---
    elif report_type == "eligibility-status":
        query = """
            SELECT c.id, c.first_name, c.last_name, e.eligible, e.mea_review_date
            FROM clients.clients c
            JOIN clients.eligibility e ON c.id = e.client_id
            WHERE c.tenant_id = :tenant_id
        """
        params = {"tenant_id": user.tenant_id}
        if client_id:
            query += " AND c.id = :client_id"
            params["client_id"] = client_id
        if status:
            query += " AND c.status = :status"
            params["status"] = status
        if start_date:
            query += " AND e.mea_review_date >= :start_date"
            params["start_date"] = start_date
        if end_date:
            query += " AND e.mea_review_date <= :end_date"
            params["end_date"] = end_date

        rows = db.execute(query, params).fetchall()
        df = pd.DataFrame(rows, columns=["ID", "First Name", "Last Name", "Eligible", "MEA Review Date"])

    # --- Tasks Completed ---
    elif report_type == "tasks-completed":
        query = """
            SELECT c.id, c.first_name, c.last_name, t.task, t.completed_at
            FROM clients.clients c
            JOIN tasks t ON c.id = t.client_id
            WHERE c.tenant_id = :tenant_id AND t.status = 'Done'
        """
        params = {"tenant_id": user.tenant_id}
        if client_id:
            query += " AND c.id = :client_id"
            params["client_id"] = client_id
        if start_date:
            query += " AND t.completed_at >= :start_date"
            params["start_date"] = start_date
        if end_date:
            query += " AND t.completed_at <= :end_date"
            params["end_date"] = end_date

        rows = db.execute(query, params).fetchall()
        df = pd.DataFrame(rows, columns=["ID", "First Name", "Last Name", "Task", "Completed At"])

    # --- Missing Documents ---
    elif report_type == "missing-documents":
        query = """
            SELECT c.id, c.first_name, c.last_name, required_docs.category AS missing_document
            FROM clients.clients c
            CROSS JOIN (
                SELECT 'MEA' AS category
                UNION SELECT 'Consent'
                UNION SELECT 'Plan of Care'
            ) AS required_docs
            LEFT JOIN clients.documents d
                ON d.client_id = c.id AND d.category = required_docs.category AND d.tenant_id = :tenant_id
            WHERE c.tenant_id = :tenant_id AND d.id IS NULL
        """
        params = {"tenant_id": user.tenant_id}

        rows = db.execute(query, params).fetchall()
        df = pd.DataFrame(rows, columns=["Client ID", "First Name", "Last Name", "Missing Document"])

    else:
        return {"error": f"Report type '{report_type}' is not yet implemented."}

    # Convert to CSV
    stream = StringIO()
    df.to_csv(stream, index=False)
    stream.seek(0)

    return StreamingResponse(
        stream,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={report_type}.csv"}
    )
