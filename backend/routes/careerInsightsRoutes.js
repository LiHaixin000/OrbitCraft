// backend/routes/careerInsightsRoutes.js
const express = require('express');
const { getPosts, createPost, addComment } = require('../controllers/careerInsightsController');
const { authenticateToken } = require('../middleware/Authenticate');
const router = express.Router();
const { likePost, unlikePost, likeComment } = require('../controllers/careerInsightsController');


router.get('/posts', authenticateToken, getPosts);
router.post('/posts', authenticateToken, createPost);
router.post('/posts/:postId/comments', authenticateToken, addComment);
router.post('/posts/:postId/like', authenticateToken, likePost);
router.delete('/posts/:postId/like', authenticateToken, unlikePost);
router.post('/comments/:commentId/like', authenticateToken, likeComment);


module.exports = router;
