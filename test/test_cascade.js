var should = require('chai').should();
var rewire = require('rewire');
var cascade = rewire('../irc_modules/cascade');

log = cascade.__get__('log');
log.unmuteOnly(); // unmuteOnly nothing === mute everything

describe('cascade.bank', function() {

  bank = cascade.__get__('bank');

  it('should return low level at five', function() {
    var testData = {funds: 5.0};
    bank(testData).should.equal('CasCADE machine funds approaching low levels.');
  });

  it('should return critically low at one fifty', function() {
    var testData = {funds: 1.50};
    bank(testData).should.equal('CasCADE machine funds at critically low levels.');
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

  it('should return null with invalid message', function() {
    var testData = {"amount": 0.50};
    should.not.exist(withdrawal(testData));
  });

});

describe('cascade.withdrawal', function() {

  withdrawal = cascade.__get__('withdrawal');

  it('should return kachunk with valid message', function() {
    var testData = {"user": "tylercrumpton", "amount": 0.50};
    withdrawal(testData).should.equal('KACHUNK!');
  });

  it('should return null with invalid message', function() {
    var testData = {"amount": 0.50};
    should.not.exist(withdrawal(testData));
  });

});
