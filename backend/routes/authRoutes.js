// backend/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const { getUserProfile } = require('../models/User');
const { authenticateToken } = require('../middleware/Authenticate');
const router = express.Router();

// Register and login routes
router.post('/register', register);
router.post('/login', login);

// Current user route
router.get('/current-user', authenticateToken, async (req, res) => {
  try {
    const user = await getUserProfile(req.user.username);
    res.json(user); // Ensure the full user object is returned
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    res.status(500).json({ error: 'Failed to fetch current user profile' });
  }
});

module.exports = router;
