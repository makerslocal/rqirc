var util      = require('util');
var log       = require('logule').init(module, 'cascade.js');
var validator = require('is-my-json-valid');

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

// example message:
//   ml256/cascade/withdrawal {"user": "tylercrumpton", "amount": 0.50}
//
// Set message for every withdrawal
//
function withdrawal(data){
  if (!validateWithdrawal(data)){
    log.error('withdrawal message not vaild');
  }
  else {
    return 'KACHUNK!';
  }
}

// example message:
//   ml256/cascade/bank {"funds": 23.50}
//
// Set message for special withdrawal events.
//
function bank(data){
  if (!validateBank(data)){
    log.error('bank message not vaild');
  }
  else {
    var message = '';
    if (data.funds === 5.00){
      message = util.format('KACHUNK! - CasCADE machine funds approaching low levels.');
    }
    else if (data.funds === 1.50){
      message = util.format('KACHUNK! - CasCADE machine funds at critically low levels.');
    }
    return message;
  }
}


module.exports = function(irc, mqtt) {
  // subscribe to all cascade messages
  mqtt.subscribe('ml256/cascade/#');

  // Lets do things on events
  mqtt.mqevent.on('ml256/cascade/*', function(data){
    var message;

    // Test what event is called
    if (this.event === 'ml256/cascade/bank'){
      message = bank(data);
    }
    else if (this.event === 'ml256/cascade/withdrawal'){
      message = withdrawal(data);
    }

    // Make sure we got a valid message
    if ( message !== null){
      log.info(message);
      irc.send('#makerslocal', message, false);
    }
  });
 };
