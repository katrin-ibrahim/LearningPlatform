import React from 'react'
// Chakra
import { Box, Flex, Image, Heading } from '@chakra-ui/react'
// Components
import LoginForm from '@/components/Login/LoginForm'
import Logo from '@/components/Shared/Logo'
import ThemeSelector from '../Shared/ThemeSelector'

export default function LoginPage() {
    return (
        <Flex
            maxH="100vh"
            minH="100vh"
            align="center"
            justifyContent="space-between"
            p={4}
        >
            <Box p={4} width="full" maxWidth="500px">
                <Flex
                    h="50vh"
                    p={4}
                    direction="column"
                    justifyContent="space-between"
                >
                    <Box position="absolute" top={10} left={10}>
                        <Logo variant="md" />
                    </Box>
                    <Box textAlign="left">
                        <Heading>Sign In</Heading>
                    </Box>
                    <LoginForm />
                </Flex>
            </Box>

            <Flex
                justifyContent="center"
                alignItems="center"
                bg="white"
                w={`calc(100vw - 550px)`}
                h="100vh"
            >
                <Image
                    src="/login-bg.jpg"
                    alt="login-background-image"
                    objectFit="contain" // Set object-fit to contain
                    width="100%" // Set width to 100%
                    maxWidth={`calc(100vw - 500px)`}
                    p={10}
                    maxH="100vh"
                />
            </Flex>
        </Flex>
    )
}
