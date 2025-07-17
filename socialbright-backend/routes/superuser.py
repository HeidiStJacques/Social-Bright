from fastapi import APIRouter, Depends, HTTPException
from dependencies.auth import get_current_user
from db.models import User


router = APIRouter(prefix="/superuser", tags=["Superuser"])

@router.get("/dashboard")
def superuser_dashboard(current_user: User = Depends(get_current_user)):
    if "superuser" not in current_user.roles:
        raise HTTPException(status_code=403, detail="Not authorized")

    return {"message": f"Welcome Superuser: {current_user.email}"}
