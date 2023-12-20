import { useState } from 'react'
// Utils
import axios from 'axios'

// TODO: Only teacher can create lesson
// TODO: feedback for user

interface CreateLessonModalProps {
    course_id: number
    teacher_id: number
    closeModal: () => void
    refreshLessons: () => void
}
export default function CreateLessonModal(props: CreateLessonModalProps) {
    const { course_id, teacher_id, closeModal, refreshLessons } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const base_url = process.env.NEXT__PUBLIC_FASTAPI_URL
    // Create Lesson function
    const createLesson = async (courseId: number, lessonData: any) => {
        try {
            const response = await axios.post(
                `${base_url}/courses/${courseId}/lessons`,
                lessonData
            );
            if (response.status === 200) {
                console.log({response})
                return response.data.lesson_id; // Return the created lesson ID
                
            }
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create lesson');
        }
    };

    // Upload File function
    const uploadFile = async (lessonId: number, fileData: File) => {
        try {
            const formData = new FormData();
            formData.append('file', fileData);

            const response = await axios.post(
                `http://localhost:8000/lessons/${lessonId}/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.status === 201) {
                console.log('File uploaded successfully');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Failed to upload file');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const lessonId = await createLesson(course_id, {
                title,
                description,
                teacher_id,
            });
            console.log({lessonId, file});
            if (lessonId && file) {
                await uploadFile(lessonId, file);
            }
            refreshLessons();
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-md relative bg-white dark:bg-gray-800 rounded-lg w-1/2">
                    <div className="flex flex-col items-start p-4">
                        {/* div grouping x and Create lesson */}
                        <div className=" flex flex-col h-full text-center items-center w-full bg-white dark:bg-gray-800 rounded-3xl">
                            <svg
                                onClick={closeModal}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-auto cursor-pointer text-gray-900 dark:text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            <h3 className="mb-3 text-4xl font-extrabold text-blue-600 dark:text-blue-300">
                                Create Lesson
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col w-full">
                            <label className="mb-2 ml-2 text-sm text-start text-gray-900 dark:text-gray-200">
                                Title
                            </label>
                            <input
                                className="w-full flex items-center px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 dark:focus:bg-gray-600 mb-7 placeholder:text-grey-700 dark:placeholder-gray-300 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl"
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label className="mb-2 text-sm text-start text-gray-900 dark:text-gray-200">
                                Description
                            </label>
                            <textarea
                                className="w-full flex items-center px-5 py-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 dark:focus:bg-gray-600 mb-7 placeholder:text-grey-700 dark:placeholder-gray-300 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label className="mb-2 text-sm text-start text-gray-900 dark:text-gray-200">
                                File
                            </label>
                            <input
                                className="w-full flex items-center px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 dark:focus:bg-gray-600 mb-7 placeholder:text-grey-700 dark:placeholder-gray-300 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl"
                                type="file"
                                onChange={(e) =>
                                    setFile(e.target.files?.[0] || null)
                                }
                            />
                            <button
                                type="submit"
                                className="w-full px-6 py-5 mb-5 text-lg font-bold leading-none text-white transition duration-300 rounded-2xl bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-200"
                            >
                                Create Lesson
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
