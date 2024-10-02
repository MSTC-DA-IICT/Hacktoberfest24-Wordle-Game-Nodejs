const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login_controll.js');

router.post('/req-otp', loginController.requestOtp);
router.post('/verify-otp', loginController.verifyOtp);

module.exports = router;