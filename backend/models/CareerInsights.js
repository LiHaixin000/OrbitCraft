// backend/models/CareerInsigts.js
const db = require('../config/db');

const getAllPosts = async () => {
  try {
    const result = await db.query(`
      SELECT posts.*, COUNT(likes.id) AS likes
      FROM posts
      LEFT JOIN likes ON posts.id = likes.post_id
      GROUP BY posts.id
      ORDER BY posts.created_at DESC
    `);
    return result.rows.map(post => ({
      ...post,
      likes: parseInt(post.likes, 10) // Ensure likes is an integer
    }));
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const createNewPost = async (user_id, title, content) => { // Use user_id as username
  try {
    const result = await db.query(
      'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *', // Use user_id as username
      [user_id, title, content]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const addNewComment = async (postId, username, content) => {
  try {
    const result = await db.query(
      'INSERT INTO comments (post_id, username, content) VALUES ($1, $2, $3) RETURNING *',
      [postId, username, content]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const addLikeToPost = async (postId, userId) => {
  try {
    const result = await db.query(
      'INSERT INTO likes (post_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
      [postId, userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const removeLikeFromPost = async (postId, userId) => {
  try {
    const result = await db.query(
      'DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING *',
      [postId, userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const addLikeToComment = async (commentId) => {
  try {
    const result = await db.query(
      'UPDATE comments SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [commentId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

module.exports = {
  getAllPosts,
  createNewPost,
  addNewComment,
  addLikeToPost,
  addLikeToComment,
  removeLikeFromPost,
};
