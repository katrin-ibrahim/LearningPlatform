from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import schemas, models
from typing import List

from database import get_db

router = APIRouter()

# get courses for a specific user
@router.get("/users/{user_id}/courses", response_model=List[schemas.UserCourses])
def get_courses(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieve the courses of a user.

    Args:
        user_id (int): The ID of the user.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        List[schemas.UserCourses]: A list of user courses.

    Raises:
        HTTPException: If the user with the specified ID is not found.
    """
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user_id} not found")
    # Join courses and user_courses on course_id and filter out courses where user id matches
    courses = db.query(models.Course).join(models.user_course).filter(models.user_course.c.user_id == user_id).all()
    # find teacher name for each course and add it to the response
    for course in courses:
        teacher = db.query(models.User).filter(models.User.user_id == course.teacher_id).first()
        course.teacher_name = teacher.username
        # add course id to the response
        course.course_id = course.course_id
    return courses

# enroll a user in a course
@router.post("/users/{user_id}/courses/{course_id}")
def enroll_student(user_id: int, course_id: int, db: Session = Depends(get_db)):
    """
    Enrolls a student in a course.

    Args:
        user_id (int): The ID of the user.
        course_id (int): The ID of the course.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: If the user or course is not found, or if the user is already enrolled in the course.

    Returns:
        dict: A dictionary containing a success message.
    """
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user_id} not found")
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Course with id {course_id} not found")
    # Check if the user is already enrolled in the course
    user_course = db.query(models.user_course).filter(models.user_course.c.user_id == user_id).filter(models.user_course.c.course_id == course_id).first()
    if user_course:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User with id {user_id} is already enrolled in course with id {course_id}")
    # Add the user to the course
    db.execute(models.user_course.insert().values(user_id=user_id, course_id=course_id))
    db.commit()
    # return success message
    return {"message": f"User with id {user_id} enrolled in course with id {course_id}"}
