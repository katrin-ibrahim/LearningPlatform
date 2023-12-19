import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import axios from 'axios'
import { Course, User } from '@/types'
import CourseCard from '@/components/CourseCard'

export default function CoursesPage() {
    const [user, setUser] = useState<User>()
    const [courses, setCourses] = useState<Course[]>([])

    const getCourses = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/users/${user?.user_id}/courses`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (response.status === 200) {
                setCourses(response.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}')
        setUser(storedUser)
    }, [])

    useEffect(() => {
        if (user && user.user_id) {
            getCourses()
        }
    }, [user])

    return (
        <>
            <Header />
            <div className="flex flex-col p-10 min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto p-4">
                    <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-6">
                        Welcome, {user?.username}!
                    </h1>
                </div>
                <div className="container mx-auto p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-6">
                        Your Courses
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {courses.map((course) => (
                            <CourseCard
                                course={course}
                                key={course.course_id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
