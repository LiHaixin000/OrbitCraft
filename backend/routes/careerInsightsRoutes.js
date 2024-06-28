const express = require('express');
const { getPosts, createPost, addComment } = require('../controllers/careerInsightsController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/posts', authenticateToken, getPosts);
router.post('/posts', authenticateToken, createPost);
router.post('/posts/:postId/comments', authenticateToken, addComment);

module.exports = router;