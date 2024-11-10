import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Flex,
  Box,
  Icon,
  Spacer,
  Button,
  Circle,
  Square,
} from "@chakra-ui/react";
import { ArrowForwardIcon, EditIcon } from "@chakra-ui/icons";
import { LuBrainCircuit } from "react-icons/lu";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const FlashcardSet = ({ set, onDelete }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Redirect to flipflashcard page
  const handleStartLearning = () => {
    navigate(`/flipflashcard/${set.set_id}`);
  };

  const handleEdit = () => {
    navigate(`/update-flashcard-set/${set.set_id}`);
  };

  // Handle delete action
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/flashcardSets/${set.set_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Notify the parent component that the set was deleted successfully
        onDelete(set.set_id);
      } else {
        console.error("Failed to delete flashcard set");
      }
    } catch (error) {
      console.error("Error deleting flashcard set:", error);
    }
  };

  return (
    <Card variant="filled" orientation="horizontal" p={5} bg="#edf2f7">
      <Flex>
        <Square size="70px" bg="teal.700" color="white" borderRadius="5">
          <Icon as={LuBrainCircuit} w={8} h={8} />
        </Square>
        <CardHeader color="teal">
          <Heading size="md">{set.set_name}</Heading>
        </CardHeader>
        <Spacer />
        <Flex flexDirection="column">
          <Button onClick={handleDelete}>
            <Circle size="30px" bg="white" color="grey">
              <Icon as={RiDeleteBin6Fill} w={4} h={4} />
            </Circle>
          </Button>
          <Button p={0} onClick={handleEdit}>
            <Circle size="30px" bg="white" color="grey">
              <Icon as={EditIcon} w={4} h={4} />
            </Circle>
          </Button>
        </Flex>
      </Flex>

      <Flex>
        <CardFooter p={0}>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="link"
            pt={5}
            onClick={handleStartLearning}
          >
            Start Learning
          </Button>
        </CardFooter>
      </Flex>
    </Card>
  );
};

export default FlashcardSet;
