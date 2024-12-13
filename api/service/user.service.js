
const UserModel = require('../models/users');

const getUser = async (username) => {
  // // Find user
  const findUser = await UserModel.find({username: username});
  if (findUser.length == 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
  }
  return findUser[0];

  return true;
};

module.exports = { getUser };