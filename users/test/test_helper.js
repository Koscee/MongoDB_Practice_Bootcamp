const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

// empty database before running each test
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
