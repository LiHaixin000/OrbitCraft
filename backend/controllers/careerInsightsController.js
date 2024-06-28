const { getAllPosts, createNewPost, addNewComment } = require('../models/CareerInsights');

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
  const { username } = req.user; // assuming you have user info in req.user
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
  const { username } = req.user; // assuming you have user info in req.user
  try {
    const comment = await addNewComment(postId, username, content);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

module.exports = {
  getPosts,
  createPost,
  addComment,
};