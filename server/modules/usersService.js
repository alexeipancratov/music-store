const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../mongoModels/User');
const config = require('../config.json');

const createUser = (userParam) => {
  const user = new User({
    username: userParam.username,
    password: bcrypt.hashSync(userParam.password, 10)
  });

  return user.save();
};

const authenticateUser = ({ username, password}) => {
  return new Promise((resolve, reject) => {
    User.findOne({username: username})
    .then(u => {
      if (bcrypt.compareSync(password, u.password)) {
        return resolve({
          token: jwt.sign({ sub: u._id }, config.jwtSecret, { expiresIn: '15m' }),
          username: u.username
        });
      } else {
        return resolve({ message: 'Invalid username or password.' });
      }
    })
    .catch(_ => {
      reject({ message: 'Invalid username or password.' });
    });
  });
};

module.exports = {
  createUser,
  authenticateUser
};