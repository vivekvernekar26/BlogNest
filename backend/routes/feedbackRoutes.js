const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { name, email, feedback } = req.body;

    if (!name || !email || !feedback) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide name, email and feedback'
        });
    }

    const feedbackData = `
-----------------------------------------
Date: ${new Date().toLocaleString()}
Name: ${name}
Email: ${email}
Feedback: ${feedback}
-----------------------------------------
`;

    const filePath = path.join(__dirname, '../feedback.txt');

    fs.appendFile(filePath, feedbackData, (err) => {
        if (err) {
            console.error('Error saving feedback:', err);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to save feedback'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Feedback saved successfully'
        });
    });
});

module.exports = router;
