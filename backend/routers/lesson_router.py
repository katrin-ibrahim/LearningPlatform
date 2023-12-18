from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
import schemas, models
from typing import List

from database import get_db

router = APIRouter()

# create a lesson in a specific course
@router.post("/courses/{course_id}/lessons", status_code=status.HTTP_201_CREATED)
def create_lesson(course_id: int, lesson: schemas.LessonBase, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with id {course_id} not found")
    
    new_lesson = models.Lesson(title=lesson.title, description=lesson.description, course_id=course_id)
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    # return success message
    return {"message": "Lesson created successfully"}

# upload a file to a specific lesson
@router.post("/lessons/{lesson_id}/upload", status_code=status.HTTP_201_CREATED)
async def upload_file(lesson_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Lesson with id {lesson_id} not found")
    # Save the file to the server
    with open(f"uploads/{file.filename}", "wb") as buffer:
        buffer.write(file.file.read())
    # Save the file path to the database
    lesson.file_path = f"uploads/{file.filename}"
    db.commit()
    # return success message
    return {"message": "File uploaded successfully"}

# get lessons for a specific course
@router.get("/courses/{course_id}/lessons", response_model=List[schemas.LessonBase])
def get_lessons(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with id {course_id} not found")
    return db.query(models.Lesson).filter(models.Lesson.course_id == course_id).all()
