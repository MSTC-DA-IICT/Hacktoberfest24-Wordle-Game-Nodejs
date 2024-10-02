// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Request OTP
  const requestOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login/req-otp', { email });
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.error?.message || "Error sending OTP");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login/verify-otp', { email, otp });
      setMessage(response.data.message);
      if (response.data.message === "OTP verified successfully") {
        navigate('/users');
      }
    } catch (error) {
      setMessage(error.response?.data?.error?.message || "Error verifying OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {otpSent ? 'Enter OTP' : 'Request OTP'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />
        </div>
        
        {otpSent && (
          <div className="mb-4">
            <label className="block text-gray-700">OTP</label>
            <input
              type="text"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </div>
        )}

        <button
          className={`w-full py-2 mt-4 text-white rounded-lg ${otpSent ? 'bg-green-500' : 'bg-blue-500'} hover:bg-opacity-80`}
          onClick={otpSent ? verifyOtp : requestOtp}
        >
          {otpSent ? 'Verify OTP' : 'Request OTP'}
        </button>

        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
