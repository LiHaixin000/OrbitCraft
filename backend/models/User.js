const db = require('../config/db');

const createUser = async (username, email, password) => {
  const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
  return result;
};

const getUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

module.exports = {
  createUser,
  getUserByUsername
};
