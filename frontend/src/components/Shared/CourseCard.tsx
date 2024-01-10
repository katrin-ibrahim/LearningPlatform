import {Card, Image, CardBody, CardFooter, Heading, Text, Button, ButtonGroup, Divider, Stack} from '@chakra-ui/react'

interface CourseCardProps {
    name: string;
    description: string;
    teacher: string;
}

export default function CourseCard(props: CourseCardProps) {
    const { name, description, teacher } = props;

    
    return (
        <Card maxW='xs'>
        <CardBody>
          <Stack  spacing='3'>
            <Heading size='md'>{name}</Heading>
            <Text colorScheme="secondary" size='xs' noOfLines={[1, 2, 3]} >
              {description}
            </Text>
            <Text>
              {teacher}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2' w="full">
            <Button variant='solid' bg="#15BA77" w='50%'>
              View
            </Button>
            <Button variant='outline' color="#15BA77" w='50%'>
              Unenroll
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
}
