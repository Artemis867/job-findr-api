const jwt = require('jsonwebtoken');

const generateAuthToken = (username = '') => {
  return jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {generateAuthToken};