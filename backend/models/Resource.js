// backend/models/Resource.js
const db = require('../config/db');

// Function to get a user's profile from the profiles table
const getUserProfile = async (username) => {
  try {
    const result = await db.query('SELECT * FROM profiles WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

// Function to update the 'upload' field to true for a specific user in the profiles table
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

// Function to get all uploaded files for a specific user from the resources table
const getAllUploadedFiles = async (username) => {
  try {
    const result = await db.query('SELECT * FROM resources WHERE username = $1', [username]);
    return result.rows;
  } catch (error) {
    console.error('Database error:', error); 
    throw error;
  }
};

// Function to save an uploaded file for a specific user in the resources table
const saveUploadedFile = async (username, filename, fileurl) => {
  try {
    console.log('Inserting file into database:', { username, filename, fileurl });

    const result = await db.query(
      'INSERT INTO resources (username, filename, fileurl) VALUES ($1, $2, $3) RETURNING *',
      [username, filename, fileurl]
    );

    console.log('Database insert result:', result.rows[0]);

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

