const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Maggie');
        done();
      }).catch(done);
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Maggie');
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Maggie' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Maggie' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Maggie' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, {  name: 'Maggie'}),
      done
    );
  });

// applying increment update operator
// add 'x' to 'it()' = xit(), this tells mocha to ommit a test
  xit('A user can have their postCount incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 10);
        done();
      }).catch(done);
  });
});
