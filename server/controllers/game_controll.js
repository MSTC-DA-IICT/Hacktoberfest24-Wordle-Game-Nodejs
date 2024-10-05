// Librairies import
const wordleLib = require('../utils/wordleLib.js');
const fs = require('fs');
const path = require("path");

// Models import
const Word = require('../models/word.js');

// Check guessed word
exports.checkWord = async (req, res) => {
    try {
        const userGuess = req.body.userGuess;

        if (!userGuess) {
            return res.status(400).json({
                error: {
                    message: "User guess is required"
                }
            });
        }

        const word = await Word.findOne({username: req.user.username});
        if (!word) {
            return res.status(404).json({
                error: {
                    message: "you have not started a game"
                }
            });
        }

        const result = wordleLib.compareStrings(word.word, userGuess);

        return res.status(200).json({
            result: result
        });

    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        });
    }
}

// Select Random Word
exports.selectWord = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../random_words.txt');
        fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err.message}`);
                return res.status(500).json({ error: 'Failed to read words file' });
            }

            const words = data.split('\n').map(word => word.trim()).filter(word => word);
            const randomWord = words[Math.floor(Math.random() * words.length)];

            await Word.deleteMany({ username: req.user.username });

            const word = new Word({
                username: req.user.username,
                word: randomWord
            });
            await word.save();

            return res.status(200).json({
                message: "Word selected successfully",
                word: randomWord
            });
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        });
    }
}