const db = require("../db");

// Get all flashcards in a specific set
const getFlashcardsBySet = (req, res) => {
  const setId = req.params.setId;
  const query = "SELECT * FROM flashcards WHERE set_id = ?";
  db.query(query, [setId], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
};

// Add a new flashcard
const addFlashcard = (req, res) => {
  const { set_id, question, answer } = req.body;
  console.log(req.body);
  
  const query =
    "INSERT INTO flashcards (set_id, question, answer) VALUES (?, ?, ?)";
  db.query(query, [set_id, question, answer], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ id: results.insertId });
  });
};

// Update a flashcard
const updateFlashcard = (req, res) => {
  const id = req.params.id;
  const { question, answer } = req.body;
  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE flashcard_id = ?';
  db.query(query, [question, answer, id], (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Flashcard not found' });
      res.status(200).json({ message: 'Flashcard updated' });
  });
};

// Delete a flashcard
const deleteFlashcard = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM flashcards WHERE flashcard_id = ?';
  db.query(query, [id], (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Flashcard not found' });
      res.status(200).json({ message: 'Flashcard deleted' });
  });
};


module.exports = {
  getFlashcardsBySet,
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
};
