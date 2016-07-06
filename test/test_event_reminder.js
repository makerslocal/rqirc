var should = require('chai').should();
var rewire = require('rewire');
var event_reminder = rewire('../irc_modules/event_reminder');
var moment = require('moment-timezone');

var log = event_reminder.__get__('log');
log.unmuteOnly(); // unmuteOnly nothing === mute everything


describe('event_reminder.mkMessage', function() {

  var mkMessage = event_reminder.__get__('mkMessage');

  it('should generate a message', function() {
    var time = moment().calendar();
    var testData = {"type":"VEVENT","params":[],"start":"2016-07-06T23:00:00.000Z","end":"2016-07-07T00:00:00.000Z","uid":"77IK4NmWQsTfH5zx+otc1g","summary":"Leather Bracer Finishing Session","url":"http://ml256.org/w35n","description":"http://ml256.org/w35n","msg":"week"}
    mkMessage(testData).should.match(/^Remember: Leather Bracer Finishing Session is happening .* http:\/\/ml256.org\/w35n/);
  });
})
