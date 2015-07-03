var util = require('util');
var log  = require('logule').init(module, 'irc');
var irc  = require('irc');
var events = require("events");
var EventEmitter = require("events").EventEmitter;

function Irc(cfg) {
  // Public
  this.config   = cfg;
  this.client   = new irc.Client(this.config.server, this.config.nick, this.config.opts);
  this.colors   = irc.colors;
  this.rqevent  = new EventEmitter();
  this.channels = [];

  // Private
  var self = this;

  // add channel to array on join
  this.client.on('join', function (channel, nick) {
    log.info("JOIN: %s %s", channel, nick);
    if (nick === self.config.nick){
      self.channels.push(channel);
    }
  });

  // remove channel for array on part
  this.client.on('part', function (channel, nick) {
    log.info("PART: %s %s", channel, nick);
    var index = self.channels.indexOf(channel);
    if (index > -1 && nick === self.config.nick) {
      self.channels.splice(index, 1);
    }
  });

  this.client.on('error', function(error){
    log.error(error);
  });

  this.client.on('message', function(nick, to, text, message){
    var pm = ( to === self.config.nick ) ? true : false;
    var split = text.split(' ');
    var msg = {
                'nick'    : nick,
                'pm'      : pm,
                'to'      : to,
                'message' : message
              };
    if ( pm ) {
      msg.text = split.slice(1).join(' ');
      self.rqevent.emit(split[0], msg);
    }
    else {
      var re = RegExp('^\!' + self.config.command + ' ');
      if ( re.test(text) ) {
        msg.text = split.slice(2).join(' ');
        self.rqevent.emit(split[1], msg);
      }
    }
  });
}

Irc.prototype.send = function(channel, msg, actionable) {
  // TODO: Check if pm
  if ( this.channels.indexOf(channel) === -1) {
    throw "Message not sent, not connected to channel";
  }
  log.info('%s - %s', channel, msg);
  if ( actionable ){
    this.client.action(channel, this.colors.wrap('light_red',msg));
  }
  else {
    this.client.say(channel, this.colors.wrap('light_red',msg));
  }
};

Irc.prototype.debugSend = function(doc) {
  if ( this.channels.indexOf(this.config.debugchan) === -1) {
    throw "Message not sent, not connected to channel";
  }
  var msg = util.format('[%s]->[%s] : %j', doc.sender, doc.destination, doc.data);
  log.info(msg);
  this.client.say(this.config.debugchan, msg);
};

// return constructor
module.exports = Irc;


