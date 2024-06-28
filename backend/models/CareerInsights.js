const db = require('../config/db');

const getAllPosts = async () => {
  try {
    const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const createNewPost = async (username, title, content) => {
  try {
    const result = await db.query(
      'INSERT INTO posts (username, title, content) VALUES ($1, $2, $3) RETURNING *',
      [username, title, content]
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

module.exports = {
  getAllPosts,
  createNewPost,
  addNewComment,
};