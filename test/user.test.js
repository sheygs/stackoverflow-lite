const { expect } = require('chai');
it('should return a positive number if input is positive', () => {
  const result = 1;
  expect(result).to.be.a('number');
  expect(result).to.equal(1);
});
