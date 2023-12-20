from fastapi import UploadFile
from pydantic import BaseModel

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
    full_name: str
    username: str
    password: str
    role: str
    
class UserLogin(BaseModel):
    username: str
    password: str
    
# Lesson SCHEMAS
class LessonBase(BaseModel):
    title: str
    description: str
    
class LessonWithId(LessonBase):
    lesson_id: int
    
class FileUpload(LessonBase):
    file: bytes