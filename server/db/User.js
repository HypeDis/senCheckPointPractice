const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 32],
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 32],
    },
  },
});

User.afterValidate(user => {
  let numCount = 0;
  user.password.split('').forEach(char => {
    if (!isNaN(char)) numCount++;
  });
  if (numCount < 2) throw new Error('password needs atleast 2 numbers');
});

module.exports = User;
