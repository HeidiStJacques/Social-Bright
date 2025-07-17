import uuid
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from db.models import PasswordReset, User  

def create_reset_token(db: Session, email: str) -> Optional[str]:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None

    token = str(uuid.uuid4())
    expires = datetime.utcnow() + timedelta(hours=1)

    reset = PasswordReset(
        user_id=user.id,
        reset_token=token,
        expires_at=expires,
        used=False
    )

    db.add(reset)
    db.commit()
    return token
