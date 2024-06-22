const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { checkUploadStatus, uploadFile, getAllFiles } = require('../controllers/resourceController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Assuming you have an auth middleware for verifying JWT tokens
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/register', register);
router.post('/login', login);
router.get('/resources/check', checkUploadStatus);
router.post('/resources/upload', upload.single('file'), handleFileUpload);
router.get('/resources/files', getAllFiles);
router.get('/profile', authenticateToken, getProfile); // Fetch user profile
router.post('/profile', authenticateToken, updateProfile); // Update user profile

module.exports = router;
