// backend/controllers/resourceController.js
const register = (req, res) => {
    // Registration logic here
    res.send('User registered');
  };
  
  const login = (req, res) => {
    // Login logic here
    res.send('User logged in');
  };
  
  module.exports = {
    register,
    login,
  };
  