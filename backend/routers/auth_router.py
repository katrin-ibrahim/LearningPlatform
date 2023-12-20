from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from sqlalchemy.orm import Session
import schemas, models
import secrets
from database import get_db

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: schemas.UserBase, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)
    new_user = models.User(username=user.username, password=hashed_password, role=user.role, full_name=user.full_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
@router.post("/token")
def login(form_data: schemas.UserLogin, db: Session = Depends(get_db)):
    username = form_data.username
    password = form_data.password

    # Validate the username and password
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    password_hash = user.password
    if not pwd_context.verify(password, password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # If the username and password are correct, return a token
    # Here you should implement your token generation logic
    token = secrets.token_urlsafe(16)
    return {"access_token": token, "user_id": user.user_id, "username": user.username, "role": user.role}
