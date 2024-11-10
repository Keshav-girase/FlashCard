import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  useToast,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const FlashcardSetForm = () => {
  const [setName, setSetName] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "" }]);
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({
    setName: "",
    description: "",
    userId: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleAddFlashcard = () => {
    setFlashcards([...flashcards, { question: "", answer: "" }]);
  };

  const handleFlashcardChange = (index, field, value) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index][field] = value;
    setFlashcards(newFlashcards);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!setName) newErrors.setName = "Flashcard set name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!userId || isNaN(userId))
      newErrors.userId = "A valid user ID is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/flashcardSets", {
        set_name: setName,
        description: description,
        user_id: parseInt(userId, 10),
        flashcards: flashcards,
      });
      toast({
        title: "Flashcard set created.",
        description: "Your flashcard set has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSetName("");
      setDescription("");
      setFlashcards([{ question: "", answer: "" }]);
      setUserId("");
      setErrors({});
      navigate('/');
    } catch (error) {
      console.error("Frontend error:", error);
      toast({
        title: "An error occurred.",
        description: `Unable to create flashcard set: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} maxW={{ base: "100%", lg: "95%" }} mx="auto">
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <GridItem colSpan={2}>
            <FormControl isInvalid={!!errors.setName} mb={4} isRequired>
              <FormLabel htmlFor="setName">Flashcard Set Name</FormLabel>
              <Input
                id="setName"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                width="100%"
              />
              {errors.setName ? (
                <FormErrorMessage>{errors.setName}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Enter the name for the flashcard set.
                </FormHelperText>
              )}
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl isInvalid={!!errors.description} mb={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                width="100%"
              />
              {errors.description ? (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Provide a brief description of the flashcard set.
                </FormHelperText>
              )}
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl isInvalid={!!errors.userId} mb={4} isRequired>
              <FormLabel htmlFor="userId">User ID</FormLabel>
              <NumberInput
                id="userId"
                value={userId}
                onChange={(valueString) => setUserId(valueString)}
                min={0}
                width="100%"
              >
                <NumberInputField />
              </NumberInput>
              {errors.userId ? (
                <FormErrorMessage>{errors.userId}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Enter your user ID (must be a number).
                </FormHelperText>
              )}
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormLabel>Flashcards</FormLabel>
            {flashcards.map((flashcard, index) => (
              <Box key={index} mb={4} p={4} borderWidth={1} borderRadius="md">
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={4}
                >
                  <GridItem>
                    <FormControl mb={2} isRequired>
                      <FormLabel htmlFor={`question-${index}`}>
                        Question
                      </FormLabel>
                      <Input
                        id={`question-${index}`}
                        value={flashcard.question}
                        onChange={(e) =>
                          handleFlashcardChange(
                            index,
                            "question",
                            e.target.value
                          )
                        }
                        width="100%"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl mb={2} isRequired>
                      <FormLabel htmlFor={`answer-${index}`}>Answer</FormLabel>
                      <Input
                        id={`answer-${index}`}
                        value={flashcard.answer}
                        onChange={(e) =>
                          handleFlashcardChange(index, "answer", e.target.value)
                        }
                        width="100%"
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>
            ))}
            <Button
              colorScheme="teal"
              onClick={handleAddFlashcard}
              mb={4}
              width="100%"
              variant="outline"
            >
              Add Another Flashcard
            </Button>
          </GridItem>

          <GridItem colSpan={2}>
            <Button colorScheme="teal" type="submit" width="100%">
              Create Flashcard Set
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};

export default FlashcardSetForm;
