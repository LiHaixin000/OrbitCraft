// backend/controllers/resourceController.js
const { getUserProfile, updateUserProfileUpload, getAllUploadedFiles, saveUploadedFile } = require('../models/Resource');
const { body, validationResult } = require('express-validator');
const { s3, upload } = require('../config/awsConfig');

// Check if user needs to upload a file
const checkUploadStatus = async (req, res) => {
  const { username } = req.user; // assuming you have user info in req.user
  try {
    const profile = await getUserProfile(username);
    if (profile && profile.upload) {
      const files = await getAllUploadedFiles();
      res.status(200).json({ uploadStatus: true, files });
    } else {
      res.status(200).json({ uploadStatus: false });
    }
  } catch (error) {
    console.error('Check upload status error:', error);
    res.status(500).json({ error: 'Failed to check upload status', details: error.message });
  }
};

// Handle file upload
const handleFileUpload = [
  // Add file validation here if needed
  async (req, res) => {
    upload(req, res, async function (error) {
      if (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: 'Failed to upload file' });
      }

      const { username } = req.user;
      const fileUrl = req.file.location; 

      try {
        await saveUploadedFile(username, req.file.originalname, fileUrl);
        await updateUserProfileUpload(username);
        const files = await getAllUploadedFiles();
        res.status(201).json(files);
      } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ error: 'Failed to upload file', details: error.message });
      }
    });
  }
];

// Get all uploaded files
const getAllFiles = async (req, res) => {
  try {
    const files = await getAllUploadedFiles();
    res.status(200).json(files);
  } catch (error) {
    console.error('Get all files error:', error);
    res.status(500).json({ error: 'Failed to get files', details: error.message });
  }
};

module.exports = {
  checkUploadStatus,
  handleFileUpload,
  getAllFiles,
};


