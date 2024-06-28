require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const careerInsightsRoutes = require('./routes/careerInsightsRoutes');
const authRoutes = require('./routes/authRoutes');

console.log('Starting server with PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();

// Middleware
app.use(express.json()); // Use express.json() instead of body-parser

// Temporary CORS configuration for localhost
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Routes
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/career-insights', careerInsightsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



