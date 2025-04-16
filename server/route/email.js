const express = require('express');
const sendMail = require('../mailer');
const router = express.Router();

router.post('/send', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const result = await sendMail(to, subject, text);
        res.status(200).json({ success: true, message: "Email sent!", result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Email failed to send", error });
    }
});

module.exports = router;
