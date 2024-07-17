// backend/routes/resourceRoutes.js
const express = require('express');
const { s3Client } = require('../config/awsConfig');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
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

router.get('/list', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
    });
    const data = await s3Client.send(command);
    const files = data.Contents.map(file => ({
      name: file.Key,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`
    }));

    res.status(200).send({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).send({ message: 'Error listing files', error: error.message });
  }
});

router.use((err, req, res, next) => {
  console.error('Error during file upload:', err);
  res.status(500).send({ message: 'File upload failed', error: err.message });
});

module.exports = router;












