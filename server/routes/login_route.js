const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login_controll.js');

router.post('/req-otp', loginController.requestOtp);
router.post('/verify-otp', loginController.verifyOtp);

router.post('/signup', loginController.signup);
router.post('/login', loginController.login);

module.exports = router;