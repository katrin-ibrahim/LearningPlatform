import { BoxProps, Box } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'
import Head from 'next/head'
import NavBar from './NavBar'

interface Props extends BoxProps {
    children: React.ReactNode
    title: string
    meta?: ReactNode
}

const Page = forwardRef<HTMLDivElement, Props>(
    ({ children, title = '', meta, ...other }, ref) => (
        <>
            <Head>
                <title>{`${title} | Learning Platform`}</title>
                {meta}
            </Head>
            <Box
                ref={ref}
                {...other}
                px={[5, 10, 20]}
                py={[5, 10]}
                w={['100%', '100%', '100%', '80%']}
            >
                <NavBar />
                {children}
            </Box>
        </>
    )
)

Page.displayName = 'Page'

export default Page
