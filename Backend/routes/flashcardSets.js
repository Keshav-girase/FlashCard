const express = require('express');
const router = express.Router();
const { getFlashcardSets, addFlashcardSet, deleteFlashcardSet, } = require('../controllers/flashcardSetsController');

// Get all flashcard sets
router.get('/', getFlashcardSets);

// Add a new flashcard set
router.post('/', addFlashcardSet);

// Route to delete a flashcard set by its ID
router.delete('/:set_id', deleteFlashcardSet);


module.exports = router;
