var util   = require('util');
var log    = require('logule').init(module, 'rss.js');
var validator = require('is-my-json-valid');

// Define our json-schema
var validate = validator({
  type : 'object',
  properties : {
    title  : {type: 'string', required: true},
    link   : {type: 'string', required: true},
    author : {type: 'string', required: true},
  }
});

function mkMessage(data){
  return util.format('New Blog Post: %s by %s %s', data.title, data.author, data.link);
}

function validateJson(data){
  if (!validate(data)){
    throw new Error('Json message is not valid');
  }
  return true;
}

module.exports = function(irc, mqtt) {
  log.info('module loaded');

  // subscribe to mqtt topic
  mqtt.subscribe('ml256/blog/post');

  mqtt.mqevent.on('ml256/blog/post', function(data){

    try {
      validateJson(data);
      var message = mkMessage(data);
      log.info(message);
      irc.debugSend(util.format('%s %j', this.event, data));
      irc.send('#makerslocal', message, false);
    }
    catch(err){
      log.error(err);
    }

  });
};
