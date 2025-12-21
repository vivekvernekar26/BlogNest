const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/config');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Using MongoDB User model instead of in-memory storage

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
};

// Secure password hashing with bcrypt
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
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
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists'
            });
        }

        // Create user (password hashed by model pre-save hook)
        const user = await User.create({
            name,
            email,
            password,
            role: req.body.role || 'user'
        });

        // Create token
        const token = generateToken(user._id);

        // Remove password from output
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({
            status: 'success',
            token,
            user: userObj
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
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.correctPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Create token
        const token = generateToken(user._id);

        // Remove password from output
        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({
            status: 'success',
            token,
            user: userObj
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
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};