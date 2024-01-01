import router from 'next/router'
// Chakra
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { FormControl, Input, Text, Box, Button } from '@chakra-ui/react'


export default function LoginForm() {
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('login')
        router.push("/home")
    }
    return (
        <Box my={10} textAlign="left">
            <form onSubmit={handleLogin}>
                <FormControl mt={4}>
                    <Input
                        type="username"
                        placeholder="Username"
                        fontSize="md"
                        size="lg"
                    />
                </FormControl>

                <FormControl mt={6}>
                    <Input
                        type="password"
                        placeholder="Password"
                        fontSize="md"
                        size="lg"
                    />
                </FormControl>
                <Text color="gray.500" fontSize="sm" mt={4}>
                    Sign in with your assigned username and password
                </Text>
                <Button
                type="submit"
                    rightIcon={
                        <ArrowForwardIcon style={{ marginRight: '0.5rem' }} />
                    }
                    justifyContent="space-between"
                    width="full"
                    size="lg"
                    mt={6}
                >
                    Login
                </Button>
            </form>
        </Box>
    )
}
