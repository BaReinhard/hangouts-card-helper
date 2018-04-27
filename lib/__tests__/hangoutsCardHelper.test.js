const assert = require('assert');
const hangoutsCardHelper = require('../index.js');

describe('hangoutsCardHelper', () => {
  it('test kv icon creator', () => {
    assert(
      { keyValue: { icon: 'AIRPLANE' } },
      hangoutsCardHelper.createIconKeyValue('airplane')
    );
  });
});
