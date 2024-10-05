const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    word: {
        type: String,
        required: true
    },
    attempts: {
        type: Number,
        default: 0,
        max: 6
    }
});

module.exports = mongoose.model('Word', wordSchema);