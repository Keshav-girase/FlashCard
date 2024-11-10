import React, { useEffect, useState } from "react";
import { Grid, Box, Spinner } from "@chakra-ui/react";
import FlashcardSet from "./FlashcardSet";

const FlashcardGrid = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/flashcardSets")
      .then((response) => response.json())
      .then((data) => {
        setFlashcardSets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching flashcard sets:", error);
        setLoading(false);
      });
  }, []);

  console.log(flashcardSets);

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  const handleDelete = (deletedSetId) => {
    setFlashcardSets((prevSets) =>
      prevSets.filter((set) => set.set_id !== deletedSetId)
    );
  };

  return (
    <Box p={{ base: 4, sm: 6, md: 8, lg: 12 }}>
      <Grid
        templateColumns={{
          base: "1fr", // Single column on small screens
          sm: "repeat(2, 1fr)", // Two columns on small screens
          md: "repeat(3, 1fr)", // Three columns on medium screens
          lg: "repeat(3, 1fr)", // Four columns on large screens
        }}
        gap={6}
      >
        {flashcardSets.map((set) => (
          <FlashcardSet key={set.set_id} set={set} onDelete={handleDelete}/>
        ))}
      </Grid>
    </Box>
  );
};

export default FlashcardGrid;
