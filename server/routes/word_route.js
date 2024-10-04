const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Middleware to read and shuffle words
function readAndShuffleWords(req, res, next) {
    const filePath = path.join(__dirname, '../../random_words.txt');
    console.log(`Reading file from: ${filePath}`); // Debugging line

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`); // Debugging line
            return res.status(500).json({ error: 'Failed to read words file' });
        }

        const words = data.split('\n').map(word => word.trim()).filter(word => word);
        req.shuffledWords = shuffle(words);
        next();
    });
}

module.exports = readAndShuffleWords;

// Route to get a random word
router.get('/random-word', readAndShuffleWords, (req, res) => {
    const randomWord = req.shuffledWords[Math.floor(Math.random() * req.shuffledWords.length)];
    res.json({ word: randomWord });
});

module.exports = router;