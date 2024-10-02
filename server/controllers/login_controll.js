// Librairies import
const mongoose = require('mongoose');
const otpGenerator = require('otp-generator');

// Models import
const Otp = require('../models/otp.js');
const e = require("express");
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

// SignUp 

exports.signUp = async (req,res)=>{
    try {
        const {username, password, email} = req.body;

        if(!username ||!password ||!email){
            return res.status(400).json({
                error: {
                    message: "Username, password and email are required"
                }
            });
        }

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({
                error: {
                    message: "Email already exists"
                }
            });
        }

        const newUser = new User({
            username,
            password,
            email
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: "Internal Server Error"
            }
        });
    }
}

// Login

exports.logIn = async (req,res)=>{
    try {
        console.log("wow");

        const {email, password} = req.body;
        

        if(!email ||!password){
            return res.status(400).json({
                error: {
                    message: "Email and password are required"
                }
            });
        }
        

        const user = await User.findOne({email: email});
        
        const isPassCorrect = await user.isPasswordCorrect(password);
        

        if(!user ||!(isPassCorrect)){
            return res.status(401).json({
                error: {
                    message: "Invalid email or password"
                }
            });
        }
        
        const resUser = user.toObject();
        delete resUser.password;
        const accessToken = await user.accessToken();

        const options = {
            httpOnly: true,
            secure: true,
          };

        return res.status(200).cookie("accessToken",accessToken,options).json({
            message: "User logged in successfully",
            user : resUser,
            access_token: accessToken,
        });

    } catch (error) {
        res.status(500).json({
            error: {
                message: "Internal Server Error"
            }
        });
    }
}


