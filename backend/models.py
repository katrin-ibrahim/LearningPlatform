from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Table
from sqlalchemy.orm import relationship
from database import Base

# This is the association table for the many-to-many relationship between User and Course
user_course = Table('user_course', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.user_id')),
    Column('course_id', Integer, ForeignKey('courses.course_id')),
)

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    username = Column(String, index=True)
    password = Column(String, index=True)
    courses = relationship("Course", secondary=user_course, back_populates="users")
    role = Column(Enum('Teacher', 'Student', name='role'))
    
class Course(Base):
    __tablename__ = "courses"
    course_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    teacher_id = Column(Integer, ForeignKey("users.user_id"))
    lessons = relationship("Lesson", back_populates="course")
    users = relationship("User", secondary=user_course, back_populates="courses")
    
    
class Lesson(Base):
    __tablename__ = "lessons"
    lesson_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    file_path = Column(String, index=True, nullable=True)
    course_id = Column(Integer, ForeignKey("courses.course_id"))
    course = relationship("Course", back_populates="lessons")
