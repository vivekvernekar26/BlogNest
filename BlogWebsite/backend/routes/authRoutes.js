const express = require('express');
const { body } = require('express-validator');
const {
    register,
    login,
    getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register user
router.post(
    '/register',
    [
        body('name', 'Name is required').not().isEmpty().trim(),
        body('email', 'Please include a valid email').isEmail().normalizeEmail(),
        body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
    ],
    register
);

// Login user
router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail().normalizeEmail(),
        body('password', 'Password is required').exists()
    ],
    login
);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;