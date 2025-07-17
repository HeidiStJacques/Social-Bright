# routes/stripe.py

from fastapi import APIRouter, Request
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import stripe
import os

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

router = APIRouter()

class CheckoutRequest(BaseModel):
    priceId: str
    tenantId: str

@router.post("/create-checkout-session")
async def create_checkout_session(payload: CheckoutRequest, request: Request):
    try:
        print("Creating session with priceId:", payload.priceId)

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="subscription",
            line_items=[
                {
                    "price": payload.priceId,
                    "quantity": 1,
                }
            ],
            success_url=f"http://localhost:8000/success",
            cancel_url=f"http://localhost:8000/cancel",
            metadata={"tenant_id": payload.tenantId},
        )
        return JSONResponse({"url": session.url})
    except Exception as e:
        print("Stripe error:", str(e))  # ← Add this
        return JSONResponse(status_code=500, content={"error": str(e)})

