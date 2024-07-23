// backend/models/User.js
const db = require('../config/db');

// Create a new user in the users table
const createUser = async (username, email, hashedPassword) => {
  try {
    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createUser:', error); 
    throw error;
  }
};

// Get user details by username or email from the users table
const getUserByUsernameOrEmail = async (identifier) => {
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [identifier]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in getUserByUsernameOrEmail:', error); 
    throw error;
  }
};

// Create a new profile for a user in the profiles table
const createUserProfile = async (username) => {
  try {
    const result = await db.query(
      'INSERT INTO profiles (username) VALUES ($1) RETURNING *',
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createUserProfile:', error); 
    throw error;
  }
};

// Get user profile details by username from the profiles table
const getUserProfile = async (username) => {
  try {
    const result = await db.query(
      `SELECT u.username, u.email, p.age, p.major, p.description, p.upload, p.gender, p.year_of_graduation, p.avatar_url
       FROM users u
       LEFT JOIN profiles p ON u.username = p.username
       WHERE u.username = $1`,
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in getUserProfile:', error);
    throw error;
  }
};

// Update user profile details in the profiles table
const updateUserProfile = async (username, age, major, description, gender, year_of_graduation, avatar_url) => {
  try {
    const result = await db.query(
      'UPDATE profiles SET age = $1, major = $2, description = $3, gender = $4, year_of_graduation = $5, avatar_url = $6 WHERE username = $7 RETURNING *',
      [age, major, description, gender, year_of_graduation, avatar_url, username]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in updateUserProfile:', error); 
    throw error;
  }
};

// Update the 'upload' field to true for a specific user in the profiles table
const updateUserProfileUpload = async (username) => {
  try {
    const result = await db.query(
      'UPDATE profiles SET upload = true WHERE username = $1 RETURNING *',
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in updateUserProfileUpload:', error); 
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByUsernameOrEmail,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  updateUserProfileUpload
};
