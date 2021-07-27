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
  const { users, blogPosts, comments } = mongoose.connection.collections;
  users.drop(() => {
    blogPosts.drop(() => {
      comments.drop(() => {
        done();
      });
    });
  });
});
