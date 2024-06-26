// backend/models/group.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Group = sequelize.define('Group', {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  members: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

module.exports = Group;

