// controllers/resourceController.js
const { getUserProfile, updateUserProfileUpload, getAllUploadedFiles, saveUploadedFile } = require('../models/Resource');

// Check if user needs to upload a file
const checkUploadStatus = async (req, res) => {
  try {
    console.log('Request headers:', req.headers); // Log request headers to verify token
    console.log('User info:', req.user); // Log user info to verify
    const { username } = req.user; // assuming you have user info in req.user
    const profile = await getUserProfile(username);

    if (profile && profile.upload) {
      res.status(200).json({ uploadStatus: true });
    } else {
      res.status(200).json({ uploadStatus: false });
    }
  } catch (error) {
    console.error('Check upload status error:', error);
    res.status(500).json({ error: 'Failed to check upload status', details: error.message });
  }
};

// Handle file upload
const handleFileUpload = async (req, res) => {
  try {
    console.log('Request headers:', req.headers); // Log request headers to verify token
    console.log('User info:', req.user); // Log user info to verify
    const { username } = req.user; 
    const fileUrl = req.file.location; 

    const savedFile = await saveUploadedFile(username, req.file.originalname, fileUrl); // Save file and get the result
    await updateUserProfileUpload(username);
    const files = await getAllUploadedFiles(username); 

    res.status(201).json({ message: 'File uploaded successfully', files });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
};

// Get all uploaded files for a specific user
const getAllFiles = async (req, res) => {
  try {
    console.log('Request headers:', req.headers); // Log request headers to verify token
    console.log('User info:', req.user); // Log user info to verify
    const { username } = req.user; // assuming you have user info in req.user
    const files = await getAllUploadedFiles(username);
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


