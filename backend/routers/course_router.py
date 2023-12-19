from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
import schemas, models
from database import get_db

router = APIRouter()

# return all courses
@router.get("/courses")
def get_courses(db: Session = Depends(get_db)):
    """
    Retrieve all courses from the database.

    Parameters:
    - db: The database session.

    Returns:
    - List of courses.
    - Courses are returned with their lessons and users.
    """
    courses = db.query(models.Course).options(joinedload(models.Course.lessons), joinedload(models.Course.users)).all()
    return courses

# create a course
@router.post("/courses", status_code=status.HTTP_201_CREATED)
def create_course(course: schemas.CourseBase, db: Session = Depends(get_db)):
    """
    Create a new course and assign a teacher to it.

    Args:
        course (schemas.CourseBase): The course data
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        dict: A dictionary containing the success message.
    """
    teacher = db.query(models.User).filter(models.User.user_id == course.teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Teacher with id {course.teacher_id} not found")
    new_course = models.Course(title=course.title, description=course.description, teacher_id=course.teacher_id)
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    
    # Add the teacher to be associated with the course
    db.execute(models.user_course.insert().values(user_id=course.teacher_id, course_id=new_course.course_id))
    db.commit()
    # return success message
    return {"message": "Course created successfully"}

