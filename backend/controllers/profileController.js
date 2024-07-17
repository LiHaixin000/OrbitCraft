// backend/controllers/profileController.js
const {
  getUserProfile,
  updateUserProfile,
  createUserProfile,
} = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const username = req.user.username;
    const profile = await getUserProfile(username);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch profile", details: error.message });
  }
};

const updateProfileHandler = async (req, res) => {
  try {
    const username = req.user.username;
    const { age, major, description, gender, year_of_graduation } = req.body;
    const avatar_url = req.file ? req.file.location : req.body.avatar_url; // Ensure req.file.location is correct

    // Debugging logs
    console.log("File data:", req.file);
    console.log("Avatar URL:", avatar_url);

    // Updating profile logic
    let profile = await getUserProfile(username);
    if (!profile) {
      profile = await createUserProfile(username);
    }

    const updatedProfile = await updateUserProfile(
      username,
      age,
      major,
      description,
      gender,
      year_of_graduation,
      avatar_url
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ error: "Failed to update profile", details: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfileHandler,
};
