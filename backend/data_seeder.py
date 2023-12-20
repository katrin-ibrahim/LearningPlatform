from mimesis import Person, Datetime, Text
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import User, Course, Lesson, user_course as UserCourses
from passlib.context import CryptContext

# Instantiate Mimesis providers
person = Person('en')
datetime = Datetime('en')
text = Text('en')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
hashed_password = pwd_context.hash("123")

# Create a new session
db = SessionLocal()

# Generate data for the User table
teacher_ids = []
course_ids = []
student_ids = []

for _ in range(1, 21):
    user = User(
        full_name=person.full_name(),
        username=person.username(),
        password=hashed_password,
        role='Teacher',
    )
    db.add(user)
    db.flush()
    teacher_ids.append(user.user_id)
    db.commit()

for _ in range(21, 101):
    user = User(
        full_name=person.full_name(),
        username=person.username(),
        password=hashed_password,
        role='Student',
    )
    db.add(user)
    db.flush()
    student_ids.append(user.user_id)
    db.commit()

for _ in range(15):
    course = Course(
        title=text.title(),
        description=text.text(),
        teacher_id=person.random.choice(teacher_ids),
    )
    db.add(course)
    db.flush()
    course_ids.append(course.course_id)
    db.commit()

# Generate data for the Lesson table
for _ in range(200):
    lesson = Lesson(
        title=text.title(),
        description=text.text(),
        file_path=None,
        course_id=person.random.choice(course_ids),
    )
    db.add(lesson)

# Populate the user_course association table
user_ids = teacher_ids + student_ids
for user_id in user_ids:
    for course_id in course_ids:
        db.execute(UserCourses.insert().values(user_id=user_id, course_id=course_id))

# Commit the changes
db.commit()
