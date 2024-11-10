import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bg='teal.500' color='white' p={4} mt={10}>
            <Flex direction='column' align='center' maxW='1200px' mx='auto'>
                <Text mb={2}>© 2024 FlashDeck. All rights reserved.</Text>
                <Flex>
                    <Link href="/privacy-policy" color='white' mr={4}>
                        Privacy Policy
                    </Link>
                    <Link href="/terms-of-service" color='white'>
                        Terms of Service
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Footer;
