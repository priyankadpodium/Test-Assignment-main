const Order = require('../models/order');

describe('Model Test', () => {
  it('Create order', () => {
    const order1 = new Order();
    expect(order1).toBeDefined();
  });
});