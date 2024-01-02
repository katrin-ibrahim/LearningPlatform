// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// Chakra
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return( 
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Component {...pageProps} />
  </ChakraProvider>
  )}
