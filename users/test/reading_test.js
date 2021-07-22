const assert = require('assert');
const User  = require('../src/user');

describe('Reading user out of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        // make sure to call the toString method on both ids when comparing them
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      }).catch(done);  // resolves timeout error if test fails
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      }).catch(done);  // resolves timeout error if test fails
  });
});
