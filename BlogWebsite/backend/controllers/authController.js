const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/config');

// In-memory storage for demo purposes
const users = [];
let userIdCounter = 1;

// Export users array for use in auth middleware
module.exports.users = users;

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
};

// Simple password hashing for demo (in production, use bcrypt)
const hashPassword = (password) => {
    return Buffer.from(password).toString('base64');
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists'
            });
        }

        // Create user
        const user = {
            id: userIdCounter++,
            name,
            email,
            password: hashPassword(password), // In production, use bcrypt
            role: req.body.role || 'user',
            createdAt: new Date().toISOString()
        };

        users.push(user);

        // Create token
        const token = generateToken(user.id);

        // Remove password from output
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({
            status: 'success',
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Check password (in production, use bcrypt.compare)
        const isMatch = user.password === hashPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Create token
        const token = generateToken(user.id);

        // Remove password from output
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            status: 'success',
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = users.find(u => u.id === req.user.id);
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Remove password from output
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            status: 'success',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};