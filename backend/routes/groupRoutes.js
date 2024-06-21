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

// Get all groups
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM groups');
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

module.exports = router;
