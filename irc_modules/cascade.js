var util      = require('util');
var log       = require('logule').init(module, 'cascade.js');
var validator = require('is-my-json-valid');

// example mesage:
//   ml256/cascade/withdrawal {"user": "tylercrumpton", "amount": 0.50}

// Define our json-schemas
var validateWithdrawal = validator({
  type : 'object',
  properties : {
    user   : {type: 'string', required: true},
    amount : {type: 'number', required: true},
  }
});

var validateBank = validator({
  type : 'object',
  properties : {
    funds : {type: 'number', required: true},
  }
});

module.exports = function(irc, mqtt) {
  // subscribe to mqtt topics
  mqtt.subscribe('ml256/cascade/withdrawal');
  mqtt.subscribe('ml256/cascade/bank');

  mqtt.mqevent.on('ml256/cascade/withdrawal', function(data){
    // use json-schema to validate mqtt data
    if (!validateWithdrawal(data)){
      log.error('withdrawal message not vaild');
    }
    else {
      // create and send message
      var message = util.format('KACHUNK!');
      log.info(message);
      irc.send('#makerslocal', message, false);
    }
  });
  
  mqtt.mqevent.on('ml256/cascade/bank', function(data){
    // use json-schema to validate mqtt data
    if (!validateBank(data)){
      log.error('bank message not vaild');
    }
    else {
      // post to irc on certain fund levels, "KACHUNK" on others
      var message = util.format('KACHUNK!');
      if (data.funds === 5.00){
        message = util.format('CasCADE machine funds approaching low levels.');
      } else if (data.funds === 1.50){
        message = util.format('CasCADE machine funds at critically low levels.');
      log.info(message);
      irc.send('#makerslocal', message, false);
    }
  });
};
