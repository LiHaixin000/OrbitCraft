const db = require('../config/db');

const createMentor = async (username, expertise) => {
  try {
    const result = await db.query(
      'INSERT INTO mentors (username, expertise) VALUES ($1, $2) RETURNING *',
      [username, expertise]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const createMentee = async (username, interest) => {
  try {
    const result = await db.query(
      'INSERT INTO mentees (username, interest) VALUES ($1, $2) RETURNING *',
      [username, interest]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const matchMentorMentee = async () => {
  try {
    const result = await db.query(
      `SELECT mentors.username AS mentor, mentees.username AS mentee
       FROM mentors
       JOIN mentees ON mentors.expertise = mentees.interest`
    );
    return result.rows;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

module.exports = {
  createMentor,
  createMentee,
  matchMentorMentee,
};

