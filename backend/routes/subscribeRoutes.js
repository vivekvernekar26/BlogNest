const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide an email address'
        });
    }

    const subscriberData = `
-----------------------------------------
Date: ${new Date().toLocaleString()}
Email: ${email}
-----------------------------------------
`;

    const filePath = path.join(__dirname, '../subscribers.txt');

    fs.appendFile(filePath, subscriberData, (err) => {
        if (err) {
            console.error('Error saving subscriber:', err);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to save subscriber'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Thank you for subscribing to our newsletter!'
        });
    });
});

module.exports = router;
