import React from 'react';
import {Flex, Text, Image } from '@chakra-ui/react';

interface LogoProps {
    variant: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant }) => {
    let iconSize = '';
    let fontSize = '';
    let textSize = '';

    switch (variant) {
        case 'sm':
            iconSize = '36px';
            fontSize = 'sm';
            textSize = '17px'
            break;
        case 'md':
            iconSize = '46px';
            fontSize = 'md';
            textSize = '23px'
            break;
        default:
            iconSize = '36px';
            fontSize = 'sm';
            textSize = '17px'
            break;
    }
    const isDark = false;

    return (
        <Flex alignItems="center">
           <Image src="/logo.png" alt="Logo" width={iconSize} height={iconSize} />
           <Flex flexDirection="column" height={iconSize} ml={1}>
            <Text fontFamily="Courier New" fontSize={textSize} display="flex" fontWeight={"bold"} lineHeight="1" color={"#B4B0B9"} m={0} >
                LEARNING
            </Text>
            <Text fontFamily="Courier New" fontSize={textSize} display="flex" fontWeight={"bold"} lineHeight={1} color={"#B4B0B9"} m={0}>
                PLATFORM
            </Text>
        </Flex>
        </Flex>
    );
};

export default Logo;
