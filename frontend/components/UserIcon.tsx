import { useState, useEffect } from 'react'

export default function UserIcon() {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // Handle logout here
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  // Close the popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    if (isOpen && event.target && (event.target as Element).closest('.popover') === null) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-1 mt-1 bg-blue-500 hover:bg-blue-700 rounded-full">
        <svg className="w-6 h-6 text-white dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <button onClick={handleLogout} className="popover absolute right-0 mt-2 py-1 px-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 rounded shadow">Logout</button>
      )}
    </div>
  )
}
