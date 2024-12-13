const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../service/token.service');
const { authenticateJWT } = require('../middleware/authenticate');
const { getUser } = require('../service/user.service');

router.get('/check', (req, res, next) => {
  res.json({
    message: '[API working] access user route',
  });
});

router.post('/signup', async(req, res) => {

  const {username, password, email, full_name} = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if username already exists
  const userExists = await UserModel.find({username: username});

  if (userExists.length >= 1) {
      return res.status(400).json({ message: 'Username already taken.' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    email,
    full_name,
    password: hashedPassword,
  });

  newUser.save()
    .then(doc => {
      res.json({ 
        success: true,
        message: 'User registered successfully.',
        username: username,
        token: generateAuthToken(username)
      });
    })
    .catch(err => {
      // console.error('Error saving user:', err);
      res.status(400).json({success: false, message: 'Internal server error.'});
    });
});

router.post('/signin', async(req, res, next) => {

  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Find user
  const userExists = await UserModel.find({username: username});
  if (userExists.length == 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const user = userExists[0];

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.', success: false });
  }

  res.status(200).json({ 
    message: 'login successful',
    success: true,
    username: user.username,
    token: generateAuthToken() 
  });
});

router.post('/info', [authenticateJWT], async (req, res, next) => {
  const {user} = req.body;

  console.log('USERNAME: ');
  console.log(user);

  try {
    const userData = await getUser(user);

    console.log('USERDATA:');
    console.log(userData);
    const creds = {
      username: userData.username,
      email: userData.email,
      full_name: userData.full_name,
    };

    res.json({
      success: 'true',
      message: 'access info endpoint',
      user: creds,
    });

  } catch (err) {
    return res.status(400).json({success: false, message: 'internal server error'});
  }
});




module.exports = router;