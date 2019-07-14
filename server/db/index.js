const db = require('./db');
const User = require('./User');
const Profile = require('./Profile');

Profile.belongsTo(User);

module.exports = { db, User, Profile };
