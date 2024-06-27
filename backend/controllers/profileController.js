// backend/controllers/profileController.js
const { getUserProfile, updateUserProfile, createUserProfile } = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const username = req.user.username;
    const profile = await getUserProfile(username);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
};

const updateProfileHandler = async (req, res) => {
  try {
    const username = req.user.username;
    const { age, major, description, gender, year_of_graduation } = req.body; 
    console.log('Updating profile for user:', username);
    console.log('Profile data:', { age, major, description, gender, year_of_graduation });

    // Check if the profile exists
    let profile = await getUserProfile(username);
    if (!profile) {
      // Create a new profile if it doesn't exist
      profile = await createUserProfile(username);
    }

    const updatedProfile = await updateUserProfile(username, age, major, description, gender, year_of_graduation, null); 

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfileHandler
};
