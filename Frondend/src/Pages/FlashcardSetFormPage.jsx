import React from 'react';
import FlashcardSetForm from '../components/FlashcardSetForm'; // Adjust the path based on your file structure
import { Box, Heading, Center } from '@chakra-ui/react';

const FlashcardSetFormPage = () => {
    return (
        <Center height='100vh' width='100%' mt={8}>
            <Box
                width={{ base: '95%', sm: '95%', md: '75%', lg: '60%' }} // Responsive width for the container
                p={6}
                mt={10}
                mb={10}
                bg='#edf2f7' // Background color for the container
                borderRadius='md'
                textAlign='center' // Center text inside the container
            >
                <Heading as="h1" size="xl" mb={6} color="teal.500">
                    Create Flashcard Set
                </Heading>
                <Box textAlign='left'>
                    <FlashcardSetForm />
                </Box>
            </Box>
        </Center>
    );
};

export default FlashcardSetFormPage;
