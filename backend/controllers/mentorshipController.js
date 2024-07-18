// backend/controllers/mentorshipController.js
const { createOrUpdateMentor, createOrUpdateMentee, matchMentorMentee } = require('../models/Mentorship');

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

module.exports = {
  handleCreateMentor,
  handleCreateMentee,
  handleMatchMentorMentee,
};

