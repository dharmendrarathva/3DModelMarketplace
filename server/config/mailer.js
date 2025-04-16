const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (to, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD, 
            },
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            text: text,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendMail;
