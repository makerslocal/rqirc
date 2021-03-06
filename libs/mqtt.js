/**
 * TODO: don't bomb out on connection drops
 */

var mqtt = require('mqtt');
var validator = require('validator');
var log = require('logule').init(module, 'mqtt');
var EventEmitter = require('eventemitter2').EventEmitter2;
var subTopic = [];

module.exports = Mqtt;

function Mqtt(cfg) {
  log.info("creating new mqtt connection");
  this.client = mqtt.connect(cfg);
  this.mqevent = new EventEmitter({wildcard: true, delimiter: '/'});

  // Private
  var self = this;

  this.client.on('connect', function() {
    log.info("Connected");
    self.client.subscribe(subTopic);
  });

  this.client.on('message', function(topic, payload) {
    var msg = payload.toString();
    log.info("mqtt message -> %s", topic, msg);
    if (validator.isJSON(msg)) {
      self.mqevent.emit(topic, JSON.parse(msg));
    } else {
      log.error('not valid json');
    }
  });
}

// subscribe to topic passed in
Mqtt.prototype.subscribe = function(topic) {
  this.client.subscribe(topic);
  subTopic.push(topic);
};

// publish mqtt message
Mqtt.prototype.send = function(topic, message) {
  this.client.publish(topic, message);
};
