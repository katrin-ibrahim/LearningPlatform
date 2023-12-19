import { useRouter } from 'next/router';
import axios from 'axios';
import { Lesson } from '@/types';
import { useEffect, useState } from 'react';
import CreateLessonModal from '@/components/CreateLessonModal';
import Header from '@/components/Header'; // Import Header component

export default function CourseDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [courseId, setCourseId] = useState<number | undefined>(undefined);
  const [content, setContent] = useState<Lesson[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      setCourseId(id as unknown as number);
    }
  }, [id, router.isReady]);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser?.user_id);
    }
  }, []);

  const getCourseContent = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/courses/${courseId}/lessons`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          userId: userId,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setContent(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const downloadFile = async (lessonId: number) => {
    console.log(lessonId);
    try {
      const response = await axios.get(`http://localhost:8000/lessons/${lessonId}/download`, {
        responseType: 'blob', // Set the response type to blob to handle binary data
      });
  
      // Create a link element to initiate the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'downloaded_file.bin'); // Set the default download filename
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
  
      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
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
    <>
    <div className={`flex flex-col min-h-screen ${showModal ? 'blur' : ''}`}>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-6">
          Course Content
        </h1>
      </div>
      <div className="container mx-auto p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {content.map((lesson) => (
            <div key={lesson.lesson_id} className="p-4  bg-gray-100 dark:bg-gray-700 rounded shadow transform transition duration-500 ease-in-out hover:scale-105 text-blue-500 dark:text-blue-300">
              <h3 className="text-xl font-bold">{lesson.title}</h3>
              <p className="line-clamp-2 my-2">{lesson.description}</p>
              <button onClick={() => downloadFile(lesson.lesson_id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download File</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={openModal} className="fixed right-4 bottom-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        +
      </button>
      
    </div>
    {showModal && courseId && userId !== undefined && (
      <CreateLessonModal
        course_id={courseId}
        teacher_id={userId}
        closeModal={() => setShowModal(false)}
        refreshLessons={getCourseContent}
      />
    )}
    </>
  );
}
