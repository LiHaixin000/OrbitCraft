// backend/routes/resourceRoutes.js
const express = require('express');
const multer = require('multer');
const { s3Client } = require('../config/awsConfig');
const { ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3');
const router = express.Router();

// Configure Multer
const storage = multer.memoryStorage(); // Store files in memory for processing before uploading to S3
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).send({ message: 'No file uploaded' });
  }

  try {
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Date.now().toString() + '-' + req.file.originalname, // Unique key for the file
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    console.log('File uploaded successfully:', req.file.originalname);
    res.status(200).send({ message: 'File uploaded successfully', url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}` });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    res.status(500).send({ message: 'Error uploading file to S3', error: error.message });
  }
});

router.get('/list', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
