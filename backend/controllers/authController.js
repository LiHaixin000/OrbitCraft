// backend/config/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername, createUserProfile } = require('../models/User');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

// Registration
const register = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await createUser(username, email, hashedPassword);

      // Create a profile for the new user
      await createUserProfile(username);

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Registration error:', error); // Log detailed error
      if (error.code === '23505') { // PostgreSQL error code for unique violation
        return res.status(400).json({ error: 'Username or email already exists' });
      }
      res.status(500).json({ error: 'User registration failed', details: error.message });
    }
  }
];

// Login
const login = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      const user = await getUserByUsername(username);
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error); // Log detailed error
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  }
];

module.exports = {
  register,
  login
};
