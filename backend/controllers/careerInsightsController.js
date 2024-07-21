// backend/controllers/careerInsightsController.js
const { getAllPosts, createNewPost, addNewComment, addLikeToPost, removeLikeFromPost } = require('../models/CareerInsights');

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { username } = req.user; 

  try {
    const post = await createNewPost(username, title, content); 
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const { username } = req.user; 
  try {
    const comment = await addNewComment(postId, username, content);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const likePost = async (req, res) => {
  const { postId } = req.params;
  const { username } = req.user;

  try {
    const like = await addLikeToPost(postId, username);
    res.status(201).json(like);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
};

const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const { username } = req.user;

  try {
    const unlike = await removeLikeFromPost(postId, username);
    res.status(200).json(unlike);
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ error: 'Failed to unlike post' });
  }
};

const likeComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const like = await addLikeToComment(commentId);
    res.status(201).json(like);
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ error: 'Failed to like comment' });
  }
};

module.exports = {
  getPosts,
  createPost,
  addComment,
  likePost,
  unlikePost,
  likeComment,
};



