var util   = require('util');
var moment = require('moment-timezone');
var log    = require('logule').init(module, 'event_reminder.js');

// example:
//  ml256/event/reminder
//   {
//   "type": "VEVENT",
//   "params": [],
//   "start": "2016-05-10T23:201630:00.000Z",
//   "end": "2016-05-11T02:00:00.000Z",
//   "uid": "19SAp3aKyx2KXESnxLzpFA",
//   "summary": "Workshop Safety Class",
//   "url": "http://ml256.httporg/w34w",
//   "description": "http://ml256.org/w34w",
//   "msg": "week"
//   }

module.exports = function(irc, mqtt) {
  // subscribe to mqtt topic
  mqtt.subscribe('ml256/event/reminder');

  mqtt.mqevent.on('ml256/event/reminder', function(data){
    var eventStart = moment.tz(data.start, 'America/Chicago');

    var message = util.format('Remember: %s is happening %s', data.summary, eventStart.calendar());
    log.info(message);
    irc.send('#makerslocal', message, false);
  });
};
