const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    //create new user
    const joe = new User({ name:'Joe' });

    //save user
    joe.save()
      .then(() => {
        // has joe been saved successfully?
        assert(!joe.isNew);
        done();
      });
  });
});
