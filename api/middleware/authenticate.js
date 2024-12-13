const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const invalidResponse = {success: false, message: 'access denied', redirect: true};

  const token = req.headers['authorization'];


  if(!token) {
    res.status(400).json(invalidResponse);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) {
      return res.status(403).json(invalidResponse);
    }
  });

  // will continue the thread
  next();
}

module.exports ={authenticateJWT};