// backend/models/Group.js
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  courseCode: { type: String, required: true },
  members: [{ type: String }],
});

module.exports = mongoose.model('Group', groupSchema);
