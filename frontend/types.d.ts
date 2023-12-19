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