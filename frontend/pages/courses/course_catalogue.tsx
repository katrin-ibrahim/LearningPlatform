import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import axios from 'axios'
import { Course } from '@/types'
import CourseCard from '@/components/CourseCard'

export default function Catalogue() {
    const [courses, setCourses] = useState<Course[]>([])
    const [userCourses, setUserCourses] = useState<Course[]>([])
    const [user, setUser] = useState({ user_id: 0, username: '', token: '' })

    const enrollUser = async (course_id: number) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/users/${user.user_id}/courses/${course_id}`,
                {
                    course_id: course_id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (response.status === 200) {
                console.log('enrolled')
            }
        } catch (err) {
            console.error(err)
        }
    }
    const getCourseCatalogue = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/courses`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 200) {
                setCourses(response.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const getUserCourses = async () => {
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
                setUserCourses(response.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}')
        setUser(storedUser)
        getCourseCatalogue()
    }, [])

    useEffect(() => {
        if (user && user.user_id) {
            getUserCourses()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <>
            <Header />
            <div className="flex flex-col p-10 min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto p-4">
                    <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-6">
                        Course Catalogue
                    </h1>
                </div>
                <div className="container mx-auto p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {courses.map((course) => {
                            console.log(course.course_id)
                            return (
                                // Remove unnecessary return statement
                                <CourseCard
                                    course={course}
                                    key={course.course_id}
                                    // check if user is enrolled in course
                                    // using the course.users array
                                    enrolled={userCourses.some(
                                        (userCourse) =>
                                            userCourse.course_id ===
                                            course.course_id
                                    )}
                                    enroll={() => enrollUser(course.course_id)}
                                />
                            ) // Add closing parenthesis
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
