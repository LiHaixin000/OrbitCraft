// backend/models/Mentorship.js
const db = require('../config/db');

const createOrUpdateMentor = async (username, expertise) => {
  try {
    console.log('Attempting to create or update mentor in the database');
    const result = await db.query(
      `INSERT INTO mentors (username, expertise) VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET expertise = $2
       RETURNING *`,
      [username, expertise]
    );
    console.log('Database query result:', result);
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createOrUpdateMentor:', error);
    throw error;
  }
};

const createOrUpdateMentee = async (username, interest) => {
  try {
    const result = await db.query(
      `INSERT INTO mentees (username, interest) VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET interest = $2
       RETURNING *`,
      [username, interest]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error in createOrUpdateMentee:', error);
    throw error;
  }
};

const matchMentorMentee = async (username) => {
  try {
    // Check if the user is a mentor
    const mentorCheck = await db.query('SELECT * FROM mentors WHERE username = $1', [username]);
    let result;
    if (mentorCheck.rows.length > 0) {
      // If user is a mentor, get matched mentees
      result = await db.query(
        `SELECT mentees.username AS mentee
         FROM mentors
         JOIN mentees ON mentors.expertise = mentees.interest
         WHERE mentors.username = $1`,
        [username]
      );
    } else {
      // Otherwise, get matched mentors
      result = await db.query(
        `SELECT mentors.username AS mentor
         FROM mentees
         JOIN mentors ON mentees.interest = mentors.expertise
         WHERE mentees.username = $1`,
        [username]
      );
    }
    return result.rows;
  } catch (error) {
    console.error('Database error in matchMentorMentee:', error);
    throw error;
  }
};

const sendMessage = async (senderUsername, recipientUsername, message) => {
  try {
    console.log('Attempting to send message from', senderUsername, 'to', recipientUsername);
    const result = await db.query(
      `INSERT INTO user_messages (sender_username, recipient_username, message) VALUES ($1, $2, $3)
       RETURNING *`,
      [senderUsername, recipientUsername, message]
    );
    console.log('Message sent successfully:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Database error in sendMessage:', error);
    throw error;
  }
};


module.exports = {
  createOrUpdateMentor,
  createOrUpdateMentee,
  matchMentorMentee,
  sendMessage,
};
