const db = require("../db");

// Get all flashcard sets
const getFlashcardSets = (req, res) => {
  const query = "SELECT * FROM flashcard_sets";
  db.query(query, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
};

// Add a new flashcard set along with flashcards
const addFlashcardSet = (req, res) => {
  const { set_name, description, user_id, flashcards } = req.body;

  // Convert user_id to integer
  const userId = parseInt(user_id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user_id' });
  }

  // Insert the flashcard set
  const setQuery =
    "INSERT INTO flashcard_sets (set_name, description, user_id) VALUES (?, ?, ?)";
  
  db.query(setQuery, [set_name, description, userId], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });

    const setId = results.insertId;

    // Check if there are any flashcards to insert
    if (flashcards && flashcards.length > 0) {
      const flashcardQuery =
        "INSERT INTO flashcards (set_id, question, answer) VALUES ?";

      // Create an array of values for each flashcard
      const flashcardValues = flashcards.map(flashcard => [setId, flashcard.question, flashcard.answer]);

      // Insert all flashcards at once
      db.query(flashcardQuery, [flashcardValues], (error) => {
        if (error) return res.status(500).json({ error: error.message });

        // Successfully inserted flashcard set and flashcards
        res.status(201).json({ message: 'Flashcard set and flashcards created successfully', setId });
      });
    } else {
      // No flashcards to insert, but the set was created
      res.status(201).json({ message: 'Flashcard set created successfully, but no flashcards were provided', setId });
    }
  });
};

// Delete a flashcard set
const deleteFlashcardSet = (req, res) => {
  const setId = req.params.set_id;

  // Ensure set_id is valid
  if (!setId) {
    return res.status(400).json({ error: 'Flashcard set ID is required' });
  }

  // Delete the flashcard set
  const query = 'DELETE FROM flashcard_sets WHERE set_id = ?';

  db.query(query, [setId], (error, results) => {
    if (error) {
      console.error('Error deleting flashcard set:', error.message);
      return res.status(500).json({ error: error.message });
    }

    // Check if any rows were affected (i.e., a set was deleted)
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }

    res.status(200).json({ message: 'Flashcard set deleted successfully' });
  });
};



module.exports = {
  getFlashcardSets,
  addFlashcardSet,
  deleteFlashcardSet,
};
