import React from 'react'
import { Box, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function ThemeSelector() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box textAlign="left" py={4}>
            <IconButton
                aria-label="Toggle dark mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
            />
        </Box>
    )
}
