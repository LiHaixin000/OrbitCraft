// backend/routes/resourceRoutes.js
const express = require('express');
const { upload } = require('../config/awsConfig');
const router = express.Router();

router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).send({ message: 'File upload failed', error: err.message });
    }

    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).send({ message: 'No file uploaded' });
    }

    console.log('File uploaded successfully:', req.file);
    res.status(200).send({ message: 'File uploaded successfully', url: req.file.location });
  });
});

router.use((err, req, res, next) => {
  console.error('Error during file upload:', err);
  res.status(500).send({ message: 'File upload failed', error: err.message });
});

module.exports = router;











