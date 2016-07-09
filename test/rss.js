var should = require('chai').should();
var expect = require('chai').expect();
var rewire = require('rewire');
var rss = rewire('../irc_modules/rss');

var log = rss.__get__('log');
log.unmuteOnly(); // unmuteOnly nothing === mute everything


describe('rss.mkMessage', function() {

  var mkMessage = rss.__get__('mkMessage');

  it('should generate a message', function() {
    var testData = {"title":"test","link":"http://google.com","author":"rqirc"};
    mkMessage(testData).should.equal('New Blog Post: test by rqirc http://google.com');
  });

})

describe('rss.validateJson', function() {

  var validateJson = rss.__get__('validateJson');

  it('should not throw error', function () {
    var testData = {"title":"test","link":"http://google.com","author":"rqirc"};
    validateJson(testData).should.equal(true);
  });

})
