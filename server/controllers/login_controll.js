// Librairies import
const mongoose = require('mongoose');
const otpGenerator = require('otp-generator');

// Models import
const Otp = require('../models/otp.js');
const e = require("express");

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

        const existingOtp = await Otp.exists({email: email});
        if (existingOtp) {
            return res.status(400).json({
                error: {
                    message: "An OTP has already been sent to this email"
                }
            });
        }

        const otp = otpGenerator.generate(6, {upperCase: false, specialChars: false});
        const newOtp = new Otp({
            email: email,
            otp: otp
        });
        await newOtp.save();

        // console.log(`OTP for ${email}: ${otp}`);

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

        await Otp.deleteOne({email: email, otp: otp});

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