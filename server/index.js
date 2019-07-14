const express = require('express');
const app = express();
const path = require('path');

const { db, User, Profile } = require('./db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
// user routes
app.get('/api/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(e => console.error('api/users', e));
});

// profile routes
app.get('/api/profiles', (req, res) => {
  Profile.findAll()
    .then(profiles => {
      res.send(profiles);
    })
    .catch(e => console.error(e));
});

app.get('/api/profiles/:userId', (req, res) => {
  Profile.findOne({
    where: {
      userId: req.params.userId,
    },
  })
    .then(profile => {
      res.send(profile);
    })
    .catch(e => console.error(e));
});

db.sync().then(() => {
  console.log('db synced');
  app.listen(3000, () => {
    console.log('listening');
  });
});
