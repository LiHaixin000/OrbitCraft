const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received registration request:', { username, password }); // Log the request
  try {
    let user = await User.findOne({ username });
    if (user) {
      console.log('User already exists:', username); // Log if user already exists
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, password });
    await user.save();
    console.log('User registered successfully:', username); // Log successful registration
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err); // Log any errors
    res.status(500).send('Server error');
  }
});

module.exports = router;
