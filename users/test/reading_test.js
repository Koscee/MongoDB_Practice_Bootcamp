const assert = require('assert');
const User  = require('../src/user');

describe('Reading user out of the database', () => {
  let joe, kelly, tobin, zed;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    kelly = new User({ name: 'Kelly' });
    tobin = new User({ name: 'Tobin' });
    zed = new User({ name: 'Zed' });

    Promise.all([kelly.save(), joe.save(), tobin.save(), zed.save()])
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

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 }) // sorts name in alphabetical order ("1 means Asc" and "-1 means Desc")
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2)
        assert(users[0].name === 'Kelly')
        assert(users[1].name === 'Tobin')
        done();
      }).catch(done);
  });
});
