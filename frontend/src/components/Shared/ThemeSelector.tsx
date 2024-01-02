import React from 'react'
import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function ThemeSelector() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
        />
    )
}
