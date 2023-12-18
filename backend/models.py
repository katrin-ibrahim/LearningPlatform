from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Table
from sqlalchemy.orm import relationship
from database import Base

# This is the association table for the many-to-many relationship between User and Course
# A teacher can teach many courses and a course can have many teachers
user_course = Table('user_course', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('course_id', Integer, ForeignKey('courses.id')),
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    password = Column(String, index=True)
    courses = relationship("Course", secondary=user_course, back_populates="users")
    role = Column(Enum('Teacher', 'Student', name='role'))
    
class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    teacher_id = Column(Integer, ForeignKey("users.id"))
    lessons = relationship("Lesson", back_populates="course")
    users = relationship("User", secondary=user_course, back_populates="courses")
    
    
class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="lessons")
