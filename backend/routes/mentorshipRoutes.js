// backend/routes/mentorshipRoutes.js
const express = require('express');
const {
  handleCreateMentor,
  handleCreateMentee,
  handleMatchMentorMentee,
  handleGetProfile,
  handleSendMessage,
  handleGetMessages, // Add this line for the new handler
} = require('../controllers/mentorshipController');
const { authenticateToken } = require('../middleware/Authenticate');
const router = express.Router();

router.post('/mentor', authenticateToken, handleCreateMentor);
router.post('/mentee', authenticateToken, handleCreateMentee);
router.get('/match', authenticateToken, handleMatchMentorMentee);
router.get('/profile/:username', authenticateToken, handleGetProfile); // New route for fetching profile
router.post('/message', authenticateToken, handleSendMessage); // New route for sending message
router.get('/messages', authenticateToken, handleGetMessages); // New route for fetching messages

module.exports = router;



