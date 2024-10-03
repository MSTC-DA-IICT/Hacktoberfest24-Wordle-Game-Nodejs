const express = require('express');
const router = express.Router();

const Jwt = require('../utils/jwt.js');
const gameController = require('../controllers/game_controll.js');

router.post('/check-word', Jwt.verify, gameController.checkWord);

module.exports = router;