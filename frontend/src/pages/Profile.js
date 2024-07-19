// frontend/src/pages/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../pagesCss/Profile.css'; // Import the new CSS file

function Profile() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10;
  const endYear = currentYear + 10;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const [profile, setProfile] = useState({
    username: "",
    age: "",
    major: "",
    description: "",
    gender: "",
    year_of_graduation: "",
    avatar_url: "",
  });

  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const url = `${process.env.REACT_APP_API_BASE_URL}/api/profile`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile({
          ...response.data,
          description: response.data.description || "",
        });
      } catch (error) {
        setError("Error fetching profile");
        console.error(
          "Error fetching profile:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const url = `${process.env.REACT_APP_API_BASE_URL}/api/profile`;

      const formData = new FormData();
      formData.append("age", profile.age);
      formData.append("major", profile.major);
      formData.append("description", profile.description);
      formData.append("gender", profile.gender);
      formData.append("year_of_graduation", profile.year_of_graduation);

      if (avatar) {
        formData.append("avatar", avatar);
      } else if (profile.avatar_url) {
        formData.append("avatar_url", profile.avatar_url);
      }

      // Debugging logs
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data.profile);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setError("Error saving profile");
      console.error(
        "Error saving profile:",
        error.response ? error.response.data : error.message
      );
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="profile-container">
      {profile.avatar_url && (
        <img src={profile.avatar_url} alt="Profile" className="profile-avatar" />
      )}
      <h2 className="profile-header">Edit Profile for {profile.username}</h2>
      {error && <p className="profile-error">{error}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <label htmlFor="age" className="profile-label">
          Age
        </label>
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Age"
          value={profile.age || ""}
          onChange={handleChange}
          className="profile-input"
        />
        <label htmlFor="major" className="profile-label">
          Major
        </label>
        <input
          type="text"
          id="major"
          name="major"
          placeholder="Major"
          value={profile.major || ""}
          onChange={handleChange}
          className="profile-input"
        />
        <label htmlFor="description" className="profile-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={profile.description || ""}
          onChange={handleChange}
          className="profile-textarea"
        />
        <label htmlFor="gender" className="profile-label">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={profile.gender || ""}
          onChange={handleChange}
          className="profile-select"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="year_of_graduation" className="profile-label">
          Year of Graduation
        </label>
        <select
          id="year_of_graduation"
          name="year_of_graduation"
          value={profile.year_of_graduation || ""}
          onChange={handleChange}
          className="profile-select"
        >
          <option value="">Select Year of Graduation</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="avatar" className="profile-label">
          Profile Picture
        </label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleAvatarChange}
          className="profile-input"
        />
        <button type="submit" className="profile-button">
          Save
        </button>
      </form>

      <button onClick={handleBack} className="profile-backButton">
        Back to Home
      </button>
      <ToastContainer />
    </div>
  );
}

export default Profile;
