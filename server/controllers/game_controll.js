// Librairies import
const wordleLib = require('../utils/wordleLib.js');

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
