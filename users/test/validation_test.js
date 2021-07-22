const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a username', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    // ES6 destructuring
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });
});
