import Link from 'next/link'
// Chakra
import { Flex, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
// Icons
import { GoHome, GoBook } from 'react-icons/go'
import { CgTranscript, CgLogOut } from 'react-icons/cg'
import { HamburgerIcon } from '@chakra-ui/icons'
// Components
import Logo from './Logo'
import ThemeSelector from './ThemeSelector'

export default function NavBar() {
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('logout')
  }
  
  return (
    <Flex
      align="flex-start"
      justify="space-between"
      wrap="wrap"
      px={20}
      py={10}
    >
      <HStack spacing={4} align="center">
        <Logo variant="sm" />
      </HStack>
      <HStack spacing={2}>
        <ThemeSelector />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <Link href="/home">
              <MenuItem icon={<GoHome />}>Home</MenuItem>
            </Link>
            <Link href="/courses">
              <MenuItem icon={<GoBook />}>Courses</MenuItem>
            </Link>
            <Link href="/transcript">
              <MenuItem icon={<CgTranscript />}>Transcript</MenuItem>
            </Link>
            <MenuDivider />
            <MenuItem icon={<CgLogOut />} onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}
