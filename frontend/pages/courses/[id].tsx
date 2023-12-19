// pages/courses/[id].js

import { useRouter } from 'next/router'

export default function CourseDetailPage() {
  const router = useRouter()
  const { id } = router.query

  // Fetch course details and materials here using the `id`
  // For now, let's just display the `id`
  
  return (
    <div>
      <h1>Course ID: {id}</h1>
      {/* Display course details and materials here */}
    </div>
  )
}
