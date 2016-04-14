var util = require('util');
var log  = require('logule').init(module, 'irc');
var irc  = require('internet-relay-chat');
var EventEmitter = require('eventemitter2').EventEmitter2;

//
// TODO: create events for all the things
//

function Irc(cfg) {
  // Public
  this.config   = cfg;  // config.irc
  this.nick     = this.config.connection.nick;
  this.client   = new irc(this.config.connection);
  this.colors   = irc.colors;
  this.rqevent  = new EventEmitter({
                        wildcard: true,
                        delimiter: '/'
                      });

  // Private
  var self = this;

  // print log info on connected
  this.client.on('connect', function() {
    log.info('Connected!!!!');
  });

  // Connect to server
  this.client.connect();

  // Join channels
  this.client.on('registered', function() {
    log.info('Registered!!!!');
    self.client.join(self.config.channels);
  });

  // add channel to array on join
  this.client.on('join', function (user, channel) {
    log.info("JOIN: %s %s", user.nick, channel);
  });

  // remove channel for array on part
  this.client.on('part', function (channel, nick) {
    log.info("PART: %s %s", channel, nick);
  });

  this.client.on('error', function(error){
    log.info('Error!!!!');
    log.error(error);
  });

  this.client.on('message', function(sender, channel, message){
    // Lets set some variables
    var msg = {
                'command': '',
                'nick' : sender.nick,
                'channel'  : channel,
                'message'   : ''
              };

    // test if message is command
    var re = /^!\w+/;
    if ( re.test(message) ) {
      // split message
      var split = message.split(' ');

      // remove first letter from message to get command
      msg.command = split[0].substr(1);

      // create rest of string as message
      msg.message = split.slice(1).join(' ');
      log.info(msg);

      // emit event for irc_modules
      self.rqevent.emit(msg.command, msg);
    }
  });
}

Irc.prototype.send = function(to, msg, actionable) {
  // if not in channel and is a channel, throw error
  if ( !this.client.channels.hasOwnProperty(to) && /^#/.test(to) ){
    throw "Message not sent, not connected to channel";
  }
  log.info('sending to irc : %s - %s', to, msg);
  if ( actionable ){
    this.client.action(to, util.format('%s%s', this.colors.lightRed, msg));
  }
  else {
    this.client.message(to, util.format('%s%s', this.colors.lightRed, msg));
  }
};

Irc.prototype.debugSend = function(msg) {
  if ( !this.client.channels.hasOwnProperty(this.config.bot.debugchan) ) {
    throw "Message not sent, not connected to channel";
  }
  log.info('debug msg: %s', msg);
  this.client.message(this.config.bot.debugchan, msg);
};

// return constructor
module.exports = Irc;


