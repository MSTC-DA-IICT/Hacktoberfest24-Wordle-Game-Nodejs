const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login_controll.js');

router.post('/req-otp', loginController.requestOtp);
router.post('/verify-otp', loginController.verifyOtp);
router.post('/user-login',loginController.logIn)
router.post('/user-signup', loginController.signUp);

module.exports = router;