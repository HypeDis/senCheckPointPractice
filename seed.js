const { db, User, Profile } = require('./server/db');

db.sync({ force: true })
  .then(() => {
    console.log('db synced');
    return Promise.all([
      User.create({
        username: 'monkey1987',
        password: 'asdfasfasdf12',
        email: 'mark@yahoo.com',
      }),
      Profile.create({
        firstName: 'Frank',
        lastName: 'Szwajkowski',
        birthday: '10-17-1987',
      }),
      Profile.create({
        firstName: 'Max',
        lastName: 'Payne',
        birthday: '7-20-2000',
      }),
    ]);
  })
  .then(([monkey, eliot]) => {
    return eliot.setUser(monkey);
  })

  .catch(e => {
    console.error(e);
  })
  .finally(() => {
    console.log('closing connection');
    db.close();
  });
