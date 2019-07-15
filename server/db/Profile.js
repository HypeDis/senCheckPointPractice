const Sequelize = require('sequelize');
const db = require('./db');

const Profile = db.define('profile', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 32],
      notIn: [['Eliot', 'Russell']],
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 32],
    },
  },
  birthday: {
    type: Sequelize.DATE,
    allowNull: false,
    get: function() {
      const birthday = this.getDataValue('birthday');
      console.log(birthday);

      const month = birthday.getMonth();
      console.log('month', month + 1);
      const day = birthday.getDate();
      const year = birthday.getFullYear();
      return `${month + 1}/${day}/${year}`;
    },
  },
});

Profile.beforeValidate(profile => {
  if (profile.firstName && profile.lastName) {
    const fN = profile.firstName;
    const lN = profile.lastName;
    profile.firstName = fN[0].toUpperCase() + fN.slice(1);
    profile.lastName = lN[0].toUpperCase() + lN.slice(1);
  }
});

Profile.afterValidate(profile => {
  const YearsInMS = 18 * 365 * 24 * 60 * 60 * 1000;
  const diff = Date.now() - profile.birthday;
  if (diff < YearsInMS) throw new Error('you are too young');
});

module.exports = Profile;
