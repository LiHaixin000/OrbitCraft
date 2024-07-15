// backend/config/uploadConfig.js
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Specify the file naming convention
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = { upload };
