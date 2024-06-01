const db = require('../config/db');

const createUser = async (username, email, password) => {
  const result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
  return result.rows[0];
};

const getUserByUsername = async (username) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByUsername
};
