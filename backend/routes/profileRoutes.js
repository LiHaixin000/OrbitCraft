// backend/routes/ProfileRoutes.js
const express = require('express');
const { getProfile, updateProfileHandler } = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/Authenticate');
const { uploadProfilePicture } = require('../config/awsConfig');
const router = express.Router();

console.log('updateProfileHandler:', updateProfileHandler);

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, uploadProfilePicture.single('avatar'), updateProfileHandler);

module.exports = router;


