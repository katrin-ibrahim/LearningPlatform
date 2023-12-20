import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
// Utils
import axios from 'axios'
// Types
import { Lesson, User } from '@/types'
// Components
import CreateLessonModal from '@/components/CreateLessonModal'
import Header from '@/components/Header'

// uses eps =>
// 1. get(`http://localhost:8000/courses/${courseId}/lessons`): get the lessons of a course
// 2. get(`http://localhost:8000/lessons/${lessonId}/download`): download a lesson file

export default function CourseDetailPage() {
    const router = useRouter()
    const { id } = router.query

    const [courseId, setCourseId] = useState<number | undefined>(undefined)
    const [content, setContent] = useState<Lesson[]>([])
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState<User | undefined>(undefined)
    const base_url = process.env.NEXT_PUBLIC_FASTAPI_URL

    useEffect(() => {
        if (router.isReady) {
            setCourseId(id as unknown as number)
        }
    }, [id, router.isReady])

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])

    // Get the lessons of a course
    const getCourseContent = useCallback(async () => {
        try {
            const response = await axios.get(
                `${base_url}/courses/${courseId}/lessons`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        userId: user?.user_id,
                    },
                }
            )
            if (response.status === 200) {
                setContent(response.data)
            }
        } catch (err) {
            console.error(err)
        }
    }, [courseId, user])

    // TODO: fix this
    const downloadFile = async (lessonId: number) => {
        console.log(lessonId)
        try {
            const response = await axios.get(
                `http://localhost:8000/lessons/${lessonId}/download`,
                {
                    responseType: 'blob', // Set the response type to blob to handle binary data
                }
            )

            // Create a link element to initiate the download
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'downloaded_file.bin') // Set the default download filename
            document.body.appendChild(link)
            link.click()
            if (link.parentNode) {
                link.parentNode.removeChild(link)
            }

            // Release the object URL
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error downloading file:', error)
        }
    }

    useEffect(() => {
        if (courseId && user) {
            getCourseContent()
        }
    }, [courseId, getCourseContent, user])

    const openModal = (): void => {
        setShowModal(true)
    }

    return (
        <>
            <div
                className={`flex flex-col min-h-screen ${
                    showModal ? 'blur' : ''
                }`}
            >
                <Header />
                <div className="container mx-auto p-4">
                    <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-6">
                        Course Content
                    </h1>
                </div>
                <div className="container mx-auto p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {content.map((lesson) => (
                            <div
                                key={lesson.lesson_id}
                                className="flex flex-col justify-between p-4  bg-gray-100 dark:bg-gray-700 rounded shadow transform transition duration-500 ease-in-out hover:scale-105 text-blue-500 dark:text-blue-300"
                            >
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-bold">
                                        {lesson.title}
                                    </h3>
                                    <p className="line-clamp-2 my-2">
                                        {lesson.description}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        downloadFile(lesson.lesson_id)
                                    }
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Download File
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {user?.role === 'teacher' && (
                    <button
                        onClick={openModal}
                        className="fixed right-4 bottom-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        +
                    </button>
                )}
            </div>
            {showModal && courseId && user?.user_id && (
                <CreateLessonModal
                    course_id={courseId}
                    teacher_id={user.user_id}
                    closeModal={() => setShowModal(false)}
                    refreshLessons={getCourseContent}
                />
            )}
        </>
    )
}
