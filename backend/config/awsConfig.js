// backend/config/awsConfig.js
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

// Ensure that all required environment variables are set
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION || !process.env.S3_BUCKET_NAME) {
  throw new Error('Missing required AWS environment variables');
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Logging only the last 4 characters of the secret key for security
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID.slice(-4));
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('S3_BUCKET_NAME:', process.env.S3_BUCKET_NAME);

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      console.log('Setting metadata for file:', file.originalname);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const key = Date.now().toString() + '-' + file.originalname;
      console.log('Setting key for file:', key);
      cb(null, key);
    }
  })
});

// Check if the S3 instance is created successfully
const listBucketsCommand = new ListBucketsCommand({});
s3Client.send(listBucketsCommand)
  .then(data => {
    console.log('S3 instance created successfully. Buckets:', data.Buckets);
  })
  .catch(err => {
    console.error('Error creating S3 instance:', err);
  });

module.exports = { s3Client, upload };






