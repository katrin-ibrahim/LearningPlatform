from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import course_router, auth_router, user_router, lesson_router

from database import Base, SessionLocal, engine



app = FastAPI()

app.include_router(course_router.router)
app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(lesson_router.router)

Base.metadata.create_all(bind=engine)

origins = [ "http://localhost:3000", ]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# reset the database
@app.get("/reset")
def reset():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    return {"message": "Database reset"}


