// backend/routes/ProfileRoutes.js
const express = require('express');
const { getProfile, updateProfileHandler } = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/Authenticate');
const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfileHandler);

module.exports = router;