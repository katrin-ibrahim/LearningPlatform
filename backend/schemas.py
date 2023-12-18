from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    password: str
    role: str
    
class UserLogin(BaseModel):
    username: str
    password: str
    
class CourseBase(BaseModel):
    title: str
    description: str
    
class LessonBase(BaseModel):
    title: str
    content: str