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
            textSize = '18px'
            break;
        case 'md':
            iconSize = '46px';
            fontSize = 'md';
            textSize = '23px'
            break;
        default:
            iconSize = '35px';
            fontSize = 'sm';
            textSize = '17px'
            break;
    }

    return (
        <Flex alignItems="center">
           <Image src="/logo.png" alt="Logo" width={iconSize} height={iconSize} />
           <Flex flexDirection="column" alignItems="stretch" ml={1}>
            <Text fontFamily="Courier New" fontSize={textSize} display="flex" lineHeight={1} >
                LEARNING
            </Text>
            <Text fontFamily="Courier New" fontSize={textSize} display="flex" lineHeight={1}>
                PLATFORM
            </Text>
        </Flex>
        </Flex>
    );
};

export default Logo;
