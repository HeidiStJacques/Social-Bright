from fastapi import APIRouter, Depends, HTTPException
from dependencies.auth import get_current_user  # adjust path if needed


router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard")

def admin_dashboard(current_user=Depends(get_current_user)):
    if "admin" not in current_user.roles:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return {"message": f"Welcome Admin: {current_user.email}"}
