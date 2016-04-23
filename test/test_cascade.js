var should = require('chai').should();
var rewire = require('rewire');
var cascade = rewire('../irc_modules/cascade');
var util = require('util');

describe('bank', function() {

  bank = cascade.__get__('bank');

  it('should return low level at five', function() {
    var testData = {funds: 5.0};
    bank(testData).should.equal(util.format('KACHUNK! - CasCADE machine funds approaching low levels.'));
  });

  it('should return critically low at one fifty', function() {
    var testData = {funds: 1.50};
    bank(testData).should.equal(util.format('KACHUNK! - CasCADE machine funds at critically low levels.'));
  });

  it('should return null at higher than five', function() {
    var testData = {funds: 5.50};
    should.not.exist(bank(testData));
  });

  it('should return null at less than five', function() {
    var testData = {funds: 4.50};
    should.not.exist(bank(testData));
  });

  it('should return null at less than one fifty', function() {
    var testData = {funds: 1.0};
    should.not.exist(bank(testData));
  });
})
