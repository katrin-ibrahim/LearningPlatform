// Components
import CourseCard from '@/components/Shared/CourseCard'
import NavBar from '@/components/Shared/NavBar'
import { SimpleGrid, Box } from '@chakra-ui/react'

// Dummy data representing courses
const courses = [
    {
        name: 'Course 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eget nunc.',
        teacher: 'Professor John Doe',
    },
    {
        name: 'Course 2',
        description: 'Lorem ipsum dolor sit amet',
        teacher: 'Teacher 2',
    },
    {
        name: 'Course 3',
        description: 'This is the description for Course 3',
        teacher: 'Teacher 3',
    },
    {
        name: 'Course 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eget nunc.',
        teacher: 'Professor John Doe',
    },
    {
        name: 'Course 2',
        description: 'Lorem ipsum dolor sit amet',
        teacher: 'Teacher 2',
    },
    {
        name: 'Course 3',
        description: 'This is the description for Course 3',
        teacher: 'Teacher 3',
    },
    {
        name: 'Course 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eget nunc.',
        teacher: 'Professor John Doe',
    },
    {
        name: 'Course 2',
        description: 'Lorem ipsum dolor sit amet',
        teacher: 'Teacher 2',
    },
    {
        name: 'Course 3',
        description: 'This is the description for Course 3',
        teacher: 'Teacher 3',
    },
]

export default function home() {
    return (
        <>
            <NavBar />
            <Box px={[5, 10, 20]} py={[5, 10]} >
                <SimpleGrid
                    spacing={4}
                    templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                >
                    {courses.map((course) => (
                        <CourseCard key={course.name} {...course} />
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}
