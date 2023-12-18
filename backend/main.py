from fastapi import FastAPI
from typing import Union
from routers import course_router, auth_router

from database import Base, SessionLocal
from database import engine
from sqlalchemy import text




app = FastAPI()

app.include_router(course_router.router)
app.include_router(auth_router.router)
Base.metadata.create_all(bind=engine)
@app.get("/reset_db")
def reset_db():
    try:
        db: Session = SessionLocal()

            # Drop all tables in the database
        db.execute(text("DROP TABLE IF EXISTS users CASCADE"))
        db.execute(text("DROP TABLE IF EXISTS user_courses CASCADE"))
        db.execute(text("DROP TABLE IF EXISTS courses CASCADE"))

        # Create all tables
        Base.metadata.create_all(bind=engine)

        return {"message": "Database reset successfully"}
    except Exception as e:
        return {"error": str(e)}
