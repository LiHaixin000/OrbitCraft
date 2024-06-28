// Resource.js
const db = require('../config/db');

const getUserProfile = async (username) => {
  try {
    const result = await db.query('SELECT * FROM profiles WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const updateUserProfileUpload = async (username) => {
  try {
    const result = await db.query(
      'UPDATE profiles SET upload = true WHERE username = $1 RETURNING *',
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const getAllUploadedFiles = async () => {
  try {
    const result = await db.query('SELECT * FROM resources');
    return result.rows;
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const saveUploadedFile = async (username, filename, fileurl) => {
  try {
    const result = await db.query(
      'INSERT INTO resources (username, filename, fileurl) VALUES ($1, $2, $3) RETURNING *',
      [username, filename, fileurl]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

module.exports = {
  getUserProfile,
  updateUserProfileUpload,
  getAllUploadedFiles,
  saveUploadedFile,
};