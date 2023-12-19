
import Link from 'next/link'
import UserIcon from './UserIcon' 

export default function Header() {
    
    return (
        <header className="w-full bg-blue-600 dark:bg-gray-800 text-white dark:text-gray-200 py-3 px-9 flex justify-between items-center">
            <div className="flex space-x-4 ">
                <Link href="/courses" className="hover:underline text-md dark:hover:text-gray-300 font-bold">
                    Home
                </Link>
                <Link href="/courses/course_catalogue" className="hover:underline text-md dark:hover:text-gray-300 font-bold"> 
                    Course Catalogue
                </Link>
            </div>
            <UserIcon />
        </header>
    )
}
