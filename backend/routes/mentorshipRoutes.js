// backend/routes/mentorshipRoutes.js
const express = require('express');
const { handleCreateMentor, handleCreateMentee, handleMatchMentorMentee } = require('../controllers/mentorshipController');
const { authenticateToken } = require('../middleware/Authenticate');
const router = express.Router();

router.post('/mentor', authenticateToken, handleCreateMentor);
router.post('/mentee', authenticateToken, handleCreateMentee);
router.get('/match', authenticateToken, handleMatchMentorMentee);

module.exports = router;


