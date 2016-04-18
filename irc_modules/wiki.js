var util      = require('util');
var log       = require('logule').init(module, 'wiki.js');
var validator = require('is-my-json-valid');

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

function mkMessage(data){
  var summary = util.format('wiki page [[%s]] by %s', data.title, data.user);
  if (data.comment !== null) {
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
  mqtt.subscribe('ml256/wiki/change');
  mqtt.mqevent.on('ml256/wiki/change', function(data){
    if (data.hasOwnProperty('minor')) {
      log.warn('minor change');
    }
    else if (!validate(data)){
      log.error('json not vaild');
    }
    else {
      var message = mkMessage(data);
      log.info(message);
      irc.send('##rqtest', message, false);
    }
  });
};
