const express = require('express');
const cors = require('cors');
const flashcardSetsRoutes = require('./routes/flashcardSets');
const flashcardsRoutes = require('./routes/flashcards');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/flashcardSets', flashcardSetsRoutes);
app.use('/api/flashcards', flashcardsRoutes);
// Use the flashcard routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
