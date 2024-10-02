const nodemailer = require('nodemailer');

class EmailUtils {
    // Function to send email
    static async sendEmail(email, subject, body) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: 'MS_VpImwP@trial-3yxj6ljp6e1ldo2r.mlsender.net',
                to: email,
                cc: 'jaysabva62@gmail.com',
                subject: subject,
                html: body
            };

            await transporter.sendMail(mailOptions);

            console.log("Email sent successfully");

            return true;
        } catch (error) {
            console.error("Error sending email:", error);
            return false;
        }
    };

    // Function to generate HTML for email
    static html(otp) {
        return `
       <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                color: #555555;
                line-height: 1.5;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #888888;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>OTP Verification</h1>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) is:</p>
            <div class="otp">${otp}</div>
            <p>Please enter this OTP to complete your verification.</p>
            <p>If you did not request this, please ignore this email.</p>
            <div class="footer">
                &copy; 2024 Hacktoberfest24-Wordle-Game-Nodejs .
            </div>
        </div>
    </body>
    </html>
    `;
    }
}

module.exports = EmailUtils;