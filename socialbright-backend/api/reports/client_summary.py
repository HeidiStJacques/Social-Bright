from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

from db.session import get_db
from dependencies.auth import get_current_user
from app.schemas import User

router = APIRouter()

# Register font
font_path = os.path.join("app", "static", "fonts", "Lato-Regular.ttf")
pdfmetrics.registerFont(TTFont("Lato", font_path))

@router.get("/api/reports/client_summary")
def client_summary_report(
    tenant_id: int = Query(...),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    clients = db.execute("""
        SELECT
            c.id,
            c.first_name,
            c.last_name,
            c.dob,
            c.medicaid_id,
            c.mea_review_date,
            c.financial_redet_date,
            c.status
        FROM clients.clients c
        WHERE c.tenant_id = :tenant_id
        ORDER BY c.last_name, c.first_name
    """, {"tenant_id": tenant_id}).fetchall()

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    y = height - 72

    pdf.setFont("Lato", 14)
    pdf.drawString(72, y, "Client Summary Report")
    y -= 30

    pdf.setFont("Lato", 10)
    for client in clients:
        line = f"{client.first_name} {client.last_name} | DOB: {client.dob} | Medicaid ID: {client.medicaid_id} | MEA: {client.mea_review_date} | Redet: {client.financial_redet_date} | Status: {client.status}"
        pdf.drawString(72, y, line)
        y -= 18
        if y < 72:
            pdf.showPage()
            y = height - 72
            pdf.setFont("Lato", 10)

    pdf.save()
    buffer.seek(0)

    return StreamingResponse(buffer, media_type="application/pdf", headers={
        "Content-Disposition": "inline; filename=client_summary.pdf"
    })
