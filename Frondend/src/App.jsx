// src/App.jsx
import React from 'react';
import { Grid, Card, CardHeader, CardBody, Heading, Text, Box } from '@chakra-ui/react';
import FlashcardSet from './components/FlashcardSet';
import FlashcardGrid from './components/FlashcardGrid';
import Navbar from './components/Navbar';
import FlashcardSetForm from './components/FlashcardSetForm';
import Flashcard from './components/Flashcard';
import FlipFlashcardPage from './Pages/FlipFlashcardPage';
import FlashcardSetFormPage from './Pages/FlashcardSetFormPage';
import Footer from './components/Footer';
import Layout from './Layout';
import { LuRouter } from 'react-icons/lu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
const mockFlashcardSet = {
  "set_id": 1,
  "user_id": 1,
  "set_name": "Science Flashcards",
  "description": "A set of flashcards for science topics.",
  "created_at": "2024-09-01T12:36:40.000Z"
};

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/create-flashcard-set" element={<Layout><FlashcardSetFormPage /> </Layout>} />
          <Route path="/" element={<Layout><FlashcardGrid /></Layout>} />
          <Route path="/flipflashcard/:set_id" element={<Layout><FlipFlashcardPage /> </Layout>} />
        </Routes>
      </Router>
    </ChakraProvider>
    
  );
}

export default App;


