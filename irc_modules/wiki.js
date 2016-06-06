var util      = require('util');
var log       = require('logule').init(module, 'wiki.js');
var validator = require('is-my-json-valid');

// Define our json-schema
var validate = validator({
  type : 'object',
  properties : {
    type   : {type: 'string', required: true},
    title  : {type: 'string', required: true},
    user   : {type: 'string', required: true},
    revid  : {type: 'string', required: true},
    pageid : {type: 'string', required: true}
  }
});

// Take the data from wiki2mqtt and create a string to use with irc.
function mkMessage(data){
  var summary = util.format('wiki page [[%s]] by %s', data.title, data.user);
  if (data.hasOwnProperty("comment")) {
    summary = util.format('%s ("%s")', summary, data.comment);
  }
  if (data.type === "edit") {
    summary = util.format('Detected alteration of %s - http://256.makerslocal.org/wiki?diff=%s', summary, data.revid);
  }
  else {
    summary = util.format('%s - http://256.makerslocal.org/wiki?curid=%s', summary, data.pageid);
    if (data.type === "new") {
      summary = util.format('Detected creation of %s', summary);
    }
    else {
      summary = util.format('Activity detected on %s', summary);
    }
  }
  return summary;
}

module.exports = function(irc, mqtt) {
  log.info('module loaded');
  // subscribe to mqtt topic
  mqtt.subscribe('ml256/wiki/change');

  // Uses EventEmitter2 for events, can use wildcards.
  mqtt.mqevent.on('ml256/wiki/change', function(data){

    irc.debugSend(util.format('%s %j', this.event, data));

    // Ignore minor changes
    if (data.hasOwnProperty('minor')) {
      log.warn('minor change');
    }
    // use json-schema to validate mqtt data
    else if (!validate(data)){
      log.error('json not vaild');
    }
    else {
      var message = mkMessage(data);
      log.info(message);
      irc.send('#makerslocal', message, false);
    }
  });
};
