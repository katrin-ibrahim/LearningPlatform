from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import schemas, models
from typing import List

from database import get_db

router = APIRouter()

# get courses for a specific user
@router.get("/users/{user_id}/courses", response_model=List[schemas.CourseBase])
def get_courses(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user_id} not found")
    # Join courses and user_courses on course_id and filter out courses where user id matches
    return db.query(models.Course).join(models.user_course).filter(models.user_course.c.user_id == user_id).all()

# enroll a user in a course
@router.post("/users/{user_id}/courses/{course_id}")
def enroll_student(user_id: int, course_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user_id} not found")
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with id {course_id} not found")
    # Check if the user is already enrolled in the course
    user_course = db.query(models.user_course).filter(models.user_course.c.user_id == user_id).filter(models.user_course.c.course_id == course_id).first()
    if user_course:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User with id {user_id} is already enrolled in course with id {course_id}")
    # Add the user to the course
    db.execute(models.user_course.insert().values(user_id=user_id, course_id=course_id))
    # return success message
    return {"message": f"User with id {user_id} enrolled in course with id {course_id}"}