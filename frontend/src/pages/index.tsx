// Chakra
import {
    CSSReset,
    ChakraProvider,
    theme,
} from '@chakra-ui/react'
// Components
import LoginPage from '@/components/LoginPage'

export default function Home() {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <LoginPage />
        </ChakraProvider>
    )
}
