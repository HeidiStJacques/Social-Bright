from fastapi import APIRouter, Depends, HTTPException, status, Security, Response
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt, JWTError
from pydantic import BaseModel, EmailStr
from passlib.hash import bcrypt
from db.session import get_db
from db.models import User, PasswordReset
from utils.email import send_reset_email

import uuid
import os

router = APIRouter()

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# ========== Login ==========
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not bcrypt.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token_data = {
        "sub": str(user.id),
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    }
    access_token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "roles": user.roles,
            "tenant_id": user.tenant_id,
            "tenant_name": user.tenant_name,
        }
    }

# ========== Forgot Password ==========
class ForgotPasswordRequest(BaseModel):
    email: EmailStr
    tenant_id: str

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        return {"message": "Reset link sent if account exists."}

    reset_token = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(hours=1)

    password_reset = PasswordReset(
        user_id=user.id,
        reset_token=reset_token,
        expires_at=expires_at,
        used=False
    )

    db.add(password_reset)
    db.commit()

    try:
        send_reset_email(user.email, reset_token)
    except Exception:
        return {"message": "Email failed to send."}

    return {"message": "Reset link sent if account exists."}

# =========== Password Reset ================

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    reset_entry = db.query(PasswordReset).filter(
        PasswordReset.reset_token == data.token,
        PasswordReset.used == False,
        PasswordReset.expires_at > datetime.utcnow()
    ).first()

    if not reset_entry:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user = db.query(User).filter(User.id == reset_entry.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_password = bcrypt.hash(data.new_password)
    reset_entry.used = True

    db.commit()
    return {"message": "Password reset successful"}

# --------- Logout ---------------

@router.post("/logout")
def logout():
    return {"message": "Logged out — clear token on frontend"}

# ----------- Get DB --------------

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception

    return user

