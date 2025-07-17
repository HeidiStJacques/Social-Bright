from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import User
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/api/users/create")
def create_user(user_data: dict, db: Session = Depends(get_db)):
    if db.query(User).filter_by(email=user_data["email"]).first():
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = pwd_context.hash(user_data["password"])
    new_user = User(
        email=user_data["email"],
        role=[],
        password_hash=hashed,
        tenant_id=1,  # TODO: Replace with dynamic tenant ID later
        is_active=True
    )
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}
