const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', () => {
    //create new user
    const joe = new User({ name:'Joe' });

    //save user
    joe.save();

    // assert();
  });
});
