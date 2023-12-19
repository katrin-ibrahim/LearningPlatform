from pydantic import BaseModel
from typing import List

# COURSE SCHEMAS
class CourseBase(BaseModel):
    title: str
    description: str
    teacher_id: int

class UserCourses(CourseBase):
    teacher_name: str
    course_id: int

# USER SCHEMAS
class UserBase(BaseModel):
    username: str
    password: str
    role: str
    
class UserLogin(BaseModel):
    username: str
    password: str
    
# Lesson SCHEMAS
class LessonBase(BaseModel):
    title: str
    content: str