import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, HStack, Spacer, Flex } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import './Flashcard.css'; // Import the CSS for flip animation

function Flashcard({ setId }) {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Fetch flashcards from the API
    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/flashcards/${setId}`);
                const data = await response.json();
                setFlashcards(data);
                
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchFlashcards();
    }, [setId]);

    // Handle edge cases where there are no flashcards
    if (!flashcards || flashcards.length === 0) {
        return <Text>No flashcards available.</Text>;
    }

    const handleNextFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setIsFlipped(false); // Reset flip state when navigating to the next card
    };

    const handlePrevFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setIsFlipped(false); // Reset flip state when navigating to the previous card
    };

    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };
    
    console.log("hii",flashcards);
    return (
        <Box maxW="100%" bg="#edf2f7" p={{ base: 0, md: 10 }}>
            <VStack spacing={10} width="100%">
                <Box 
                    className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
                    onClick={handleFlipCard} 
                    width={{ base: '95%', md: '60%', lg: '40%' }} // Responsive width
                    minW="100%"
                >
                    <Box className="flashcard-front" bg="white" p={{ base: 4, md: 7 }}>
                        <Text mt={2}>{flashcards[currentIndex].question}</Text>
                    </Box>
                    <Box className="flashcard-back" p={{ base: 4, md: 7 }} bg="teal.500" color="white">
                        <Text mt={2}>{flashcards[currentIndex].answer}</Text>
                    </Box>
                </Box>
                <Flex width="100%" flexDirection={{ base: 'column', md: 'row' }}>
                    <Button colorScheme="teal" onClick={handlePrevFlashcard} variant="outline" mb={{ base: 4, md: 0 }}>
                        <ArrowBackIcon mr="5" />Previous
                    </Button>
                    <Spacer />
                    <Button colorScheme="teal" onClick={handleFlipCard} variant="solid" mb={{ base: 4, md: 0 }}>
                        Show Answer
                    </Button>
                    <Spacer />
                    <Button colorScheme="teal" onClick={handleNextFlashcard} variant="outline">
                        Next <ArrowForwardIcon ml="5" />
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
}
export default Flashcard;
