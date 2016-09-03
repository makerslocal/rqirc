var util = require('util');
var log = require('logule').init(module, 'irc');
var Irc = require('internet-relay-chat');
var EventEmitter = require('eventemitter2').EventEmitter2;
var gitHead = require('git-head');

function irc(cfg) {
  // Public
  this.config = cfg;  // config.irc
  this.nick = this.config.connection.nick;
  this.client = new Irc(this.config.connection);
  this.colors = Irc.colors;
  this.rqevent = new EventEmitter({wildcard: true, delimiter: '/'});

  // Private
  var self = this;

  function gitHash() {
    gitHead('.git', function(err, hash) {
      if (err) return console.log(err);
      var trunk = hash.substring(0, 7);
      var msg = util.format('Version %s - https://github.com/makerslocal/rqirc/commit/%s', trunk, trunk);
      log.info('Version Hash: %s', trunk);
      self.debugSend(msg);
    });
  }

  this.connected = function () {
    if (typeof this.client.channels === "undefined"){
      return false;
    }
    else {
      return true;
    }
  }

  // print log info on connected
  this.client.on('connect', function() {
    log.info('Connected');
  });

  // Connect to server
  this.client.connect();

  // Join channels
  this.client.on('registered', function() {
    log.info('Registered');
    self.client.join(self.config.channels);
  });

  // add channel to array on join
  this.client.on('join', function(user, channel) {
    log.info("JOIN: %s %s", user.nick, channel);
    if (channel === self.config.bot.debugchan && user.nick === self.nick) {
      gitHash();
    }
  });

  // remove channel for array on part
  this.client.on('part', function(channel, nick) {
    log.info("PART: %s %s", channel, nick);
  });

  this.client.on('error', function(error) {
    log.error(error);
  });

  this.client.on('message', function(sender, channel, message) {
    // Lets set some variables
    var msg = {
      command: '',
      nick: sender.nick,
      channel: channel,
      message: ''
    };

    // test if message is command
    var re = /^!\w+/;
    if (re.test(message)) {
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

irc.prototype.send = function(to, msg, actionable) {
  if (!this.connected()){
    log.error("No Channels");
    return;
  }
  // if not in channel and is a channel, throw error
  if (!this.client.channels.hasOwnProperty(to) && /^#/.test(to)) {
    log.error("Message not sent, not connected to channel");
    return;
  }
  log.info('sending to irc : %s - %s', to, msg);
  if (actionable) {
    this.client.action(to, util.format('%s%s', this.colors.lightRed, msg));
  } else {
    this.client.message(to, util.format('%s%s', this.colors.lightRed, msg));
  }
};

<<<<<<< HEAD
irc.prototype.debugSend = function(msg) {
  if (!this.client.channels.hasOwnProperty(this.config.bot.debugchan)) {
    throw new Error("Message not sent, not connected to channel");
=======
Irc.prototype.debugSend = function(msg) {
  if ( !this.connected()){
    log.error("No Channels");
    return;
  }
  if ( !this.client.channels.hasOwnProperty(this.config.bot.debugchan) ) {
    log.error("Message not sent, not connected to channel");
    return;
>>>>>>> master
  }
  log.info('debug msg: %s', msg);
  this.client.message(this.config.bot.debugchan, msg);
};

// return constructor
module.exports = irc;

