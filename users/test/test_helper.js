const mongoose = require('mongoose');

// tell mongoose to use ES6 Promise implementation
mongoose.Promise = global.Promise;

// before hook runs only once for all the test
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.connection
    .once('open', () => {
      console.log('Connected successfully!');
      done();
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

// empty database before running each test
beforeEach((done) => {
  // fixed mongoose cannot read property TypeError ( blogPosts -> blogposts)
  const { users, blogposts, comments } = mongoose.connection.collections;
  users.drop(() => {
    blogposts.drop(() => {
      comments.drop(() => {
        done();
      });
    });
  });
});
