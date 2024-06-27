// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const groupRoutes = require('./routes/groupRoutes');
const profileRoutes = require('./routes/profileRoutes');

console.log('Starting server with PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();

// Middleware
app.use(express.json()); // Use express.json() instead of body-parser

// CORS configuration for localhost and deployed frontend
app.use(cors({
  origin: ['http://localhost:3000', 'https://orbit-craft.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




