const express = require('express');
const router = express.Router();

const Jwt = require('../utils/jwt.js');
const gameController = require('../controllers/game_controll.js');

router.post('/check-word', Jwt.verify, gameController.checkWord);
router.get('/select-word', Jwt.verify, gameController.selectWord);

module.exports = router;