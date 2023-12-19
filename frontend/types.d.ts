export interface User {
    user_id: number;
    username: string;
    token: string;
    role: string;
    courses: Course[];
}
export interface Course {
    course_id: number;
    title: string;
    description: string;
    teacher_id: number;
    teacher_name: string;
}
export interface Lesson {
    lesson_id: number;
    title: string;
    description: string;
    course_id: number;
    course_title: string;
    teacher_id: number;
    teacher_name: string;
    content: string;
}