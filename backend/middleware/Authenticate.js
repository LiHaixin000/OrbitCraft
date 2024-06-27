// backend/middleware/Authenticate.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' }); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: 'Token verification failed' }); // Forbidden
    }

    req.user = user;
    console.log('Token verified, user:', user);
    next();
  });
};

module.exports = {
  authenticateToken
};



