const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./routes/auth');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/orbitcraft')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', auth);

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
