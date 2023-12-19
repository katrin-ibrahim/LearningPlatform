import { Course } from '@/types'
import Link from 'next/link'

interface CourseCardProps {
    course: Course
    enrolled?: boolean
    enroll?: () => void
}

export default function CourseCard(props: CourseCardProps) {
    const { course, enrolled = true, enroll } = props
    return (
        <div
            key={course.course_id}
            className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded shadow transform transition duration-500 ease-in-out hover:scale-105 text-blue-500 dark:text-blue-300"
        >
       
            <div className='flex flex-col'>
                <Link href={`/courses/${course.course_id}`}>
                    <h3 className="text-xl font-bold">{course.title}</h3>
                    <p className="line-clamp-2">{course.description}</p>
                    <p>Teacher: {course.teacher_name}</p>
                </Link>
            </div>
            {!enrolled && (
                
            <div className="flex items-center">
                <button onClick={enroll} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Enroll
                </button>
            </div>)
            }
        </div>
    )
}
