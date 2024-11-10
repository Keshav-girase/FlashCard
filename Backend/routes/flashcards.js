const express = require('express');
const router = express.Router();
const { getFlashcardsBySet, addFlashcard, updateFlashcard, deleteFlashcard } = require('../controllers/flashcardsController');

// Get all flashcards in a specific set
router.get('/:setId', getFlashcardsBySet);

// Add a new flashcard to a set
router.post('/', addFlashcard);

// Route to update a flashcard
router.put('/:id', updateFlashcard);

// Route to delete a flashcard
router.delete('/:id', deleteFlashcard);


module.exports = router;
