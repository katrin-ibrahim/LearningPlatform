import { useRouter } from 'next/router';
import axios from 'axios';
import { Lesson } from '@/types';
import { useEffect, useState } from 'react';
import CreateLessonModal from '@/components/CreateLessonModal';

export default function CourseDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [courseId, setCourseId] = useState<number | undefined>(undefined);
  const [content, setContent] = useState<Lesson[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<number | undefined>(undefined); // Add state for userId

  useEffect(() => {
    if (router.isReady) {
      setCourseId(id as unknown as number);
    }
  }, [id, router.isReady]);

  // Fetch user from session storage
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser?.user_id); // Set userId from parsed user data
    }
  }, []);

  // Fetch course details and materials here using the `id`
  const getCourseContent = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/courses/${courseId}/lessons`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          userId: userId, // Pass userId as a parameter
        },
      });
      if (response.status === 200) {
        setContent(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (courseId !== undefined && userId !== undefined) {
      getCourseContent();
    }
  }, [courseId, userId]);

  const openModal = (): void => {
    setShowModal(true);
  };

  return (
    <div>
      <h1>Course ID: {courseId}</h1>
      {/* Display course details and materials here */}
      <button onClick={openModal}>Create Courses</button>
      {showModal && courseId && userId !== undefined && (
        <CreateLessonModal
          course_id={courseId}
          teacher_id={userId}
          closeModal={() => setShowModal(false)}
          refreshLessons={getCourseContent}
        />
      )}
    </div>
  );
}
