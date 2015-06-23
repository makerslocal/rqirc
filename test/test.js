var expect  = require('expect.js');
var config  = require('config');
var Irc     = require('../libs/irc.js');
var irc     = new Irc(config.irc);

describe('irc', function () {
  describe('send()', function () {
    it('exists as a public method', function () {
      expect(irc.send).to.be.a('function');
    });
    it('should accept channel, msg, actionable', function () {
      expect(irc.send).withArgs('##rqtest', 'test', false).to.not.throwException();
    });
  });
});
