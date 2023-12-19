import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  // TODO
  const apiRoute = process.env.FASTAPI_BASE_URL;


  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      // Send a request to backend to authenticate the user.
     const response = await axios.post(`http://localhost:8000/token`, {
            username: username,
            password: password
        }, {headers: {'Content-Type': 'application/json'}});
      if (response.status === 200) {
        // store token and user id in local storage
        sessionStorage.setItem('user', JSON.stringify(response.data))
        // Redirect to the Courses page if successfully logged in.
        router.push('/courses')
      } 
    } catch (err) {
      setError((err as any).response.data.detail)
      console.error(err)
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col w-full h-full p-6 text-center bg-white dark:bg-gray-800 rounded-3xl">
          <h3 className="mb-3 text-4xl font-extrabold text-blue-600 dark:text-blue-300">Sign In</h3>
          <p className="mb-4 text-grey-700 dark:text-gray-300">Enter your username and password</p>
          <div className="flex items-center mb-3">
            <hr className="h-0 border-b border-solid border-grey-500 dark:border-gray-600 grow" />
          </div>
          <label htmlFor="username" className="mb-2 text-sm text-start text-gray-900 dark:text-gray-200">Username*</label>
          <input id="username" type="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} className="w-full flex items-center px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 dark:focus:bg-gray-600 mb-7 placeholder:text-grey-700 dark:placeholder-gray-300 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl" />
          <label htmlFor="password" className="mb-2 text-sm text-start text-gray-900 dark:text-gray-200">Password*</label>
          <input id="password" type="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} className="w-full flex items-center px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 dark:focus:bg-gray-600 placeholder:text-grey-700 dark:placeholder-gray-300 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl" />
          {error && <p className='mb-4 text-red-500 dark:text-red-400'>{error}</p>}
          <button type="submit" className="w-full px-6 py-5 mb-5 text-lg font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl bg-blue-800 hover:bg-blue-900 dark:bg-blue-500 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-300">Sign In</button>
        </form>
      </div>
    </div>
  );
}
