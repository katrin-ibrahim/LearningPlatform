import {Card, CardBody, CardFooter, Heading, Text, Button, ButtonGroup, Divider, Stack, useColorMode} from '@chakra-ui/react'
import theme from '@/theme'

interface CourseCardProps {
    name: string;
    description: string;
    teacher: string;
}

export default function CourseCard(props: CourseCardProps) {
    const { name, description, teacher } = props;
    const { colorMode } = useColorMode(); // use the useColorMode hook

    const textColor = colorMode === 'dark' ? theme.colors.dark.text.secondary : theme.colors.light.text.secondary; // set the text color based on the color mode
    
    return (
        <Card maxW='xs' >
        <CardBody>
          <Stack  spacing='3'>
            <Heading size='sm'>{name}</Heading>
            <Text color={textColor} size='xs' noOfLines={[1, 2, 3]} >
              {description}
            </Text>
            <Text>
              {teacher}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
            <ButtonGroup >
            <Button variant='solid' >
              View
            </Button>
            <Button variant='ghost'  w='50%'>
              Unenroll
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
}
