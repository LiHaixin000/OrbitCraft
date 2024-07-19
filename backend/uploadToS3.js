// backend/uploadToS3.js
require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// Configure AWS with your access and secret key.
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME } =
  process.env;

// Log the environment variables to verify they are loaded
console.log({
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  S3_BUCKET_NAME,
});

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

// Function to upload a file to S3
const uploadFile = (filePath) => {
  // Read content from the file
  const fileContent = fs.readFileSync(filePath);

  // Setting up S3 upload parameters
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: path.basename(filePath), // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

// Replace 'test-file.txt' with the path to the file you want to upload
uploadFile(
  "/Users/LiHaixin/Desktop/OrbitCraft/frontend/public/images/feature1.jpeg"
);
