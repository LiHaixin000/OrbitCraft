// backend/controllers/resourceController.js
const path = require('path');
const fs = require('fs');
const { updateUserProfileUpload, getUserProfile } = require('../models/User'); // Import necessary functions from User model
const { saveUploadedFile } = require('../models/Resource'); // Import from Resource model

// Check if user needs to upload a file
const checkUploadStatus = async (req, res) => {
  try {
    const username = req.user.username;
    const profile = await getUserProfile(username);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ uploadStatus: profile.upload, avatarUrl: profile.avatar_url });
  } catch (error) {
    console.error('Check upload status error:', error);
    res.status(500).json({ error: 'Failed to check upload status', details: error.message });
  }
};

// Handle file upload
const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const username = req.user.username;

    // Save the file information to the database
    await saveUploadedFile(username, req.file.originalname, fileUrl);

    // Update the user's profile to set the upload field to true
    const updatedProfile = await updateUserProfileUpload(username);
    
    console.log('Updated profile:', updatedProfile); // Add this line

    res.status(201).json({ name: req.file.originalname, url: fileUrl, profile: updatedProfile });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
};


// Get all uploaded files
const getAllFiles = (req, res) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, '../uploads')).map(file => ({
      name: file,
      url: `${req.protocol}://${req.get('host')}/uploads/${file}`
    }));
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





