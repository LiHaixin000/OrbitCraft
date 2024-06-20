const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/db');

router.post(
  '/',
  [
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
    body('major').notEmpty().withMessage('Major is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { age, major, description, upload } = req.body;
    try {
      const result = await db.query(
        'INSERT INTO profiles (age, major, description, upload) VALUES ($1, $2, $3, $4) RETURNING *',
        [age, major, description, upload]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
);

module.exports = router;