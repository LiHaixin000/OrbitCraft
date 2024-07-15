// backend/controllers/mentorshipController.js
const { createMentor, createMentee, matchMentorMentee } = require('../models/Mentorship');

const handleCreateMentor = async (req, res) => {
  const { username } = req.user;
  const { expertise } = req.body;

  try {
    const mentor = await createMentor(username, expertise);
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
    const mentee = await createMentee(username, interest);
    res.status(201).json(mentee);
  } catch (error) {
    console.error('Error creating mentee:', error);
    res.status(500).json({ error: 'Failed to create mentee' });
  }
};

const handleMatchMentorMentee = async (req, res) => {
  try {
    const matches = await matchMentorMentee();
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error matching mentor and mentee:', error);
    res.status(500).json({ error: 'Failed to match mentor and mentee' });
  }
};

module.exports = {
  handleCreateMentor,
  handleCreateMentee,
  handleMatchMentorMentee,
};
