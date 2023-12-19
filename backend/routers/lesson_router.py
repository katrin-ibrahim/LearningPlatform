import shutil
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
import schemas, models
from typing import List
import os
import uuid

from database import get_db

router = APIRouter()

# create a new lesson
@router.post("/courses/{course_id}/lessons", response_model=schemas.LessonWithId)
def create_lesson(course_id: int, lesson: schemas.LessonBase, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with id {course_id} not found")
    new_lesson = models.Lesson(title=lesson.title, description=lesson.description, course_id=course_id)
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    # return lesson with id
    return new_lesson

@router.post("/lessons/{lesson_id}/upload", status_code=status.HTTP_201_CREATED)
async def upload_file(lesson_id: int, file: bytes = File(...), db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).filter(models.Lesson.lesson_id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Lesson with id {lesson_id} not found")

    # Generate a unique filename for the uploaded file
    unique_filename = f"{str(uuid.uuid4())}.bin"  # Use a more descriptive extension if applicable

    # Save the uploaded file to the server's filesystem
    upload_dir = "uploads"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    file_path = os.path.join(upload_dir, unique_filename)
    with open(file_path, "wb") as buffer:
        buffer.write(file)

    # Update the lesson object with the file path
    lesson.file_path = file_path
    db.commit()

    return {"message": "File uploaded successfully"}


# get lessons for a specific course
@router.get("/courses/{course_id}/lessons", response_model=List[schemas.LessonBase])
def get_lessons(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with id {course_id} not found")
    return db.query(models.Lesson).filter(models.Lesson.course_id == course_id).all()
