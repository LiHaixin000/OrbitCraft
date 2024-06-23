// backend/models/User.js
const db = require('../config/db');

const createUser = async (username, email, hashedPassword) => {
  try {
    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const createUserProfile = async (username) => {
  try {
    const result = await db.query(
      'INSERT INTO profiles (username) VALUES ($1) RETURNING *',
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const getUserProfile = async (username) => {
  try {
    const result = await db.query('SELECT * FROM profiles WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

const updateUserProfile = async (username, age, major, description, gender, year_of_study, upload) => {
  try {
    const result = await db.query(
      'UPDATE profiles SET age = $1, major = $2, description = $3, gender = $4, year_of_study = $5, upload = $6 WHERE username = $7 RETURNING *',
      [age, major, description, gender, year_of_study, upload, username]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error); // Log detailed error
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  createUserProfile,
  getUserProfile,
  updateUserProfile
};
