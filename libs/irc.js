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
    if (nick === self.client.nick){
      self.channels.push(channel);
    }
  });

  // remove channel for array on part
  this.client.on('part', function (channel, nick) {
    log.info("PART: %s %s", channel, nick);
    var index = self.channels.indexOf(channel);
    if (index > -1 && nick === self.client.nick) {
      self.channels.splice(index, 1);
    }
  });

  this.client.on('error', function(error){
    log.error(error);
  });

  this.client.on('message', function(nick, to, text, message){
    // Lets set some variables
    var msg = {
                'nick'    : nick,
                'to'      : to,
                'text'    : text,
                'message' : message,
                'reply'   : ''
              };
    var split = msg.text.split(' ');

    // If PM - set reply, remove command
    if ( msg.to === self.client.nick ) {
      msg.reply = msg.nick;
      msg.text = split.slice(1).join(' ');
      self.rqevent.emit(split[0].substr(1), msg);
    }
    // If channel command - set reply, and remove command
    else {
      var re = /^!\w+ /;
      if ( re.test(text) ) {
        msg.reply = msg.to;
        msg.text = split.slice(1).join(' ');
        self.rqevent.emit(split[0].substr(1), msg);
      }
    }
  });
}

Irc.prototype.send = function(to, msg, actionable) {
  // test if bot is in channel or if its a PM
  if ( this.channels.indexOf(to) === -1 && /^#/.test(to) ) {
    throw "Message not sent, not connected to channel";
  }
  log.info('send message: %s - %s', to, msg);
  if ( actionable ){
    this.client.action(to, this.colors.wrap('light_red',msg));
  }
  else {
    this.client.say(to, this.colors.wrap('light_red',msg));
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


