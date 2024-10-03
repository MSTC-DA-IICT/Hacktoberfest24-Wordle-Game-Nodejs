// Librairies import
const mongoose = require('mongoose');
const otpGenerator = require('otp-generator');

const Jwt = require('../utils/jwt.js');
const EmailUtil = require('../utils/email-sender.js');

// Models import
const Otp = require('../models/otp.js');
const User = require('../models/login_model.js');

// Request OTP
exports.requestOtp = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({
                error: {
                    message: "Email is required"
                }
            });
        }

        const existingOtp = await Otp.findOne({email: email});
        if (existingOtp && (Date.now() - existingOtp.createdAt) < 60000) {
            return res.status(400).json({
                error: {
                    message: "An OTP has already been sent to this email"
                }
            });
        }

        if (existingOtp) {
            await Otp.deleteMany({email: email});
        }

        const otp = otpGenerator.generate(6, {upperCase: false, specialChars: false});
        const newOtp = new Otp({
            email: email,
            otp: otp
        });
        await newOtp.save();

        // console.log(`OTP for ${email}: ${otp}`);

        await EmailUtil.sendEmail(email, "OTP Verification", EmailUtil.html(otp));

        res.status(201).json({
            message: "OTP sent successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: "Internal Server Error"
            }
        });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        if (!email || !otp) {
            return res.status(400).json({
                error: {
                    message: "Email and OTP are required"
                }
            });
        }

        const existingOtp = await Otp.findOne({email: email, otp: otp});
        if (!existingOtp) {
            return res.status(400).json({
                error: {
                    message: "Invalid OTP"
                }
            });
        }

        // await Otp.deleteOne({email: email, otp: otp});

        res.status(200).json({
            message: "OTP verified successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: "Internal Server Error"
            }
        });
    }
};

// Signup
exports.signup = async (req, res) => {
    try {
        const {username, email, password, otp} = req.body;
        if (!username || !email || !password || !otp) {
            return res.status(400).json({
                error: {
                    message: "Username, Email and Password are required"
                }
            });
        }

        const existingUser = await User.exists(email, username);
        if (existingUser) {
            return res.status(400).json({
                error: {
                    message: "Email or Username is already taken"
                }
            });
        }

        const existingOtp = await Otp.exists(email, otp);
        if (!existingOtp) {
            return res.status(400).json({
                error: {
                    message: "Invalid OTP"
                }
            });
        }

        const newUser = new User({
            username: username,
            email: email,
            password: password
        });
        await newUser.save();

        await Otp.deleteOne({email: email});

        const token = Jwt.sign({email: email, username: username});

        res.status(201).json({
            message: "User created successfully",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: {
                    message: "Email and Password are required"
                }
            });
        }

        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({
                error: {
                    message: "Invalid Email or Password"
                }
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                error: {
                    message: "Password is incorrect"
                }
            });
        }

        const token = Jwt.sign({email: email, username: user.username});

        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        });
    }
};