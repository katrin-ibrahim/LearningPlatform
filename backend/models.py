from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    password = Column(String, index=True)
    role = Column(String)
    
class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    lessons = relationship("Lesson", back_populates="course")
    
class TeacherCourse(Base):
    __tablename__ = "teacher_courses"
    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    teacher = relationship("User", back_populates="teacher_courses")
    course = relationship("Course", back_populates="teacher_courses")
    
class StudentCourse(Base):
    __tablename__ = "student_courses"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    student = relationship("User", back_populates="student_courses")
    course = relationship("Course", back_populates="student_courses")
    
class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    course = relationship("Course", back_populates="lessons")

# gives all courses a teacher is teaching 
User.teacher_courses = relationship("TeacherCourse", back_populates="teacher")
#  gives all courses a student is taking
User.student_courses = relationship("StudentCourse", back_populates="student")
# gives all teachers of a course 
Course.teacher_courses = relationship("TeacherCourse", back_populates="course")
# gives all students of a course
Course.student_courses = relationship("StudentCourse", back_populates="course")