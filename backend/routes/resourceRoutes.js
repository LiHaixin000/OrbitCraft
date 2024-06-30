// routes/resourceRoutes.js
const express = require('express');
const { checkUploadStatus, handleFileUpload, getAllFiles } = require('../controllers/resourceController');
const { authenticateToken } = require('../middleware/Authenticate');
const { upload } = require('../config/awsConfig');
const router = express.Router();

router.get('/check', authenticateToken, checkUploadStatus);
router.post('/upload', authenticateToken, upload, handleFileUpload);
router.get('/files', authenticateToken, getAllFiles);

module.exports = router;