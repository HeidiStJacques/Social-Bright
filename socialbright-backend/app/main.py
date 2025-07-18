# app/main.py

import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import models
from db.session import engine

# Route imports
from routes import (
    users,
    auth,
    admins,
    superuser,
    stripe,
    calendar,
    clients,
    dashboard,
    tasks  # client-specific task routes
)
from routes.calendar import router_general
from api.dashboard import alerts, tasks as dashboard_tasks, visits  # dashboard-only tasks
from api.clients import tasks as client_tasks

# Load .env variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables if not already created
models.Base.metadata.create_all(bind=engine)

# ---------- ROUTES ----------

# Public / Auth
app.include_router(users.router)
app.include_router(auth.router, prefix="/api/auth")

# Admin / Superuser
app.include_router(admins.router)
app.include_router(superuser.router)

# Stripe Payment
app.include_router(stripe.router)

# Calendar
app.include_router(calendar.router)
app.include_router(router_general)

# Clients
app.include_router(clients.router, prefix="/api/clients", tags=["clients"])

# Dashboard (metrics, reports)
app.include_router(dashboard.router, prefix="/api/dashboard")
app.include_router(alerts.router, prefix="/api/dashboard")
app.include_router(dashboard_tasks.router, prefix="/api/dashboard")  # dashboard task metrics only
app.include_router(visits.router, prefix="/api/dashboard")

# Client-specific task routes
app.include_router(client_tasks.router, prefix="/api", tags=["Tasks"])


# ---------- DEV / TEST ROUTES ----------
@app.get("/test-cors")
def test_cors():
    return {"message": "CORS is working"}

@app.get("/success")
def success():
    return {"message": "Payment successful"}

@app.get("/cancel")
def cancel():
    return {"message": "Payment canceled"}
