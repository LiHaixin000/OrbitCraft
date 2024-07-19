// backend/controllers/mentorshipController.js
const { createOrUpdateMentor, createOrUpdateMentee, matchMentorMentee, sendMessage } = require('../models/Mentorship');
const { getUserProfile } = require('../models/User'); // Import the getUserProfile function
const pool = require('../config/db'); // Assuming you're using a database connection pool


// Fetch profile information
const handleGetProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const profile = await getUserProfile(username);
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

const handleSendMessage = async (req, res) => {
  const { senderUsername, recipientUsername, message } = req.body;

  if (!senderUsername || !recipientUsername || !message) {
    console.error('Validation error: All fields are required');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    console.log('Sending message from:', senderUsername, 'to:', recipientUsername, 'message:', message);
    await sendMessage(senderUsername, recipientUsername, message);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};


const handleCreateMentor = async (req, res) => {
  const { username } = req.user;
  const { expertise } = req.body;

  try {
    console.log('Creating mentor with username:', username, 'and expertise:', expertise);
    const mentor = await createOrUpdateMentor(username, expertise);
    console.log('Mentor created successfully:', mentor);
    res.status(201).json(mentor);
  } catch (error) {
    console.error('Error creating mentor:', error);
    res.status(500).json({ error: 'Failed to create mentor' });
  }
};

const handleCreateMentee = async (req, res) => {
  const { username } = req.user;
  const { interest } = req.body;

  try {
    const mentee = await createOrUpdateMentee(username, interest);
    res.status(201).json(mentee);
  } catch (error) {
    console.error('Error creating mentee:', error);
    res.status(500).json({ error: 'Failed to create mentee' });
  }
};

const handleMatchMentorMentee = async (req, res) => {
  const { username } = req.user;
  try {
    const matches = await matchMentorMentee(username);
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error matching mentor and mentee:', error);
    res.status(500).json({ error: 'Failed to match mentor and mentee' });
  }
};

// Handler to fetch messages for the logged-in user
const handleGetMessages = async (req, res) => {
  const username = req.user.username; // Assuming the username is stored in req.user after token verification

  try {
    const result = await pool.query(
      'SELECT sender_username, message, timestamp FROM user_messages WHERE recipient_username = $1 ORDER BY timestamp DESC',
      [username]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  handleCreateMentor,
  handleCreateMentee,
  handleMatchMentorMentee,
  handleGetProfile,
  handleSendMessage,
  handleGetMessages,
};

