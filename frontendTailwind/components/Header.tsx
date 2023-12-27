
// Next
import Link from 'next/link'
import { useRouter } from 'next/router'
// Components
import UserIcon from './UserIcon' 
// Types
import { User } from '@/types'
import { useEffect } from 'react'

export default function Header() {

    // Get the user from storage
    const user : User | undefined = typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : undefined;

    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [router, user])

    // NavLink component to be used in the header to apply styles to the active link
    const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
        <Link href={href} className={`hover:underline text-md dark:hover:text-gray-300 font-bold text-lg ${router.pathname === href ? 'underline' : ''}`}>
            {children}
        </Link>
    );

    return (
        <header className="w-full bg-blue-600 dark:bg-gray-800 text-white dark:text-gray-200 py-3 px-9 flex justify-between items-center">
            <div className="flex space-x-4 ">
                <NavLink href="/courses">Dashboard</NavLink>
                {user?.role !== 'Teacher' && <NavLink href="/courses/catalogue">Catalogue</NavLink>}
            </div>
            <UserIcon />
        </header>
    )
}
