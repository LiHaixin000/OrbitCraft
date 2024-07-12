// backend/routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new group
router.post('/', async (req, res) => {
  const { groupName, courseCode, members } = req.body;

  if (!groupName || !courseCode) {
    return res.status(400).json({ message: 'Group name and course code are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO groups (group_name, course_code, members) VALUES ($1, $2, $3) RETURNING *',
      [groupName, courseCode, members || []] // Ensure members is an array
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all groups or search groups
router.get('/', async (req, res) => {
  const { search } = req.query;
  try {
    let result;
    if (search) {
      result = await db.query(
        'SELECT * FROM groups WHERE group_name ILIKE $1 OR course_code ILIKE $2',
        [`${search}%`, `${search}%`] // Use searchTerm% to match the start of the string
      );
    } else {
      result = await db.query('SELECT * FROM groups');
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join a group
router.post('/join', async (req, res) => {
  const { groupName, member } = req.body;

  if (!groupName || !member) {
    return res.status(400).json({ message: 'Group name and member are required' });
  }

  try {
    const result = await db.query(
      'UPDATE groups SET members = array_append(members, $1) WHERE group_name = $2 RETURNING *',
      [member, groupName]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error joining group:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch messages for a group
router.get('/:groupName/messages', async (req, res) => {
  const { groupName } = req.params;
  try {
    const result = await db.query('SELECT * FROM messages WHERE group_name = $1 ORDER BY created_at ASC', [groupName]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Post a new message to a group
router.post('/:groupName/messages', async (req, res) => {
  const { groupName } = req.params;
  const { content, sender } = req.body;

  if (!content || !sender) {
    return res.status(400).json({ message: 'Content and sender are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO messages (group_name, content, sender, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [groupName, content, sender]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;