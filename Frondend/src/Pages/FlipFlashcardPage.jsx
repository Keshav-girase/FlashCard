import React from 'react';
import Flashcard from '../components/Flashcard'; // Adjust the path based on your file structure
import { Box, Heading, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const FlipFlashcardPage = () => {
    const { set_id } = useParams(); // Note: using `set_id` to match the route parameter

    // Parse set_id to an integer
    const parsedSetId = parseInt(set_id, 10);

    // Handle cases where set_id is not a valid number
    if (isNaN(parsedSetId)) {
        return (
            <Box p={5}>
                <Heading as="h1">Invalid Flashcard Set ID</Heading>
                <p>The Flashcard Set ID provided is not valid.</p>
            </Box>
        );
    }

    return (
        <>
            <Center width="100%" minHeight="100vh" p={{ base: 4, md: 12 }}>
                <Box
                    width={{ base: '95%', sm: '85%', md: '70%', lg: '60%' }} // Responsive width for the container
                    p={{ base: 4, md: 6 }}
                    bg="#edf2f7"
                    borderRadius="md"
                    textAlign="center" // Center text inside the container
                    boxShadow="md" // Add some shadow for better visual appearance
                >
                    <Heading as="h1" size="xl" mb={6}>
                        Flip Flashcards
                    </Heading>
                    <Box
                        width="100%"
                        mx="auto" // Center horizontally
                    >
                        <Flashcard setId={parsedSetId} />
                    </Box>
                </Box>
            </Center>
        </>
    );
};

export default FlipFlashcardPage;
