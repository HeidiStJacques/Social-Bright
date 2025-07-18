# app/main.py

import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import models
from db.session import engine
from routes import users, auth, admins, superuser, stripe, tenant_clients, calendar, clients, dashboard
from routes.calendar import router_general
from api.dashboard import alerts, tasks, visits

# Load environment variables
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

# Create DB tables if they don't exist
models.Base.metadata.create_all(bind=engine)

# ---------- ROUTER INCLUDES ----------
app.include_router(users.router)
app.include_router(auth.router, prefix="/api/auth")
app.include_router(admins.router)
app.include_router(superuser.router)
app.include_router(stripe.router)
# app.include_router(tenant_clients.router)
app.include_router(calendar.router)
app.include_router(router_general)
app.include_router(clients.router, prefix="/api/clients", tags=["clients"])
app.include_router(dashboard.router, prefix="/api/dashboard")
app.include_router(alerts.router, prefix="/api/dashboard")
app.include_router(tasks.router, prefix="/api/dashboard")
app.include_router(visits.router, prefix="/api/dashboard")



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
