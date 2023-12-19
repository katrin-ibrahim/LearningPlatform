from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import course_router, auth_router, user_router, lesson_router

from database import Base, SessionLocal, engine
from sqlalchemy import text


app = FastAPI()

app.include_router(course_router.router)
app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(lesson_router.router)

Base.metadata.create_all(bind=engine)

origins = [ "http://localhost:3000", ]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your FastAPI server."}

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
