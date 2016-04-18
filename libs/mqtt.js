/**
 * Module dependencies.
 * @private
 */

var mqtt = require('mqtt');
var log = require('logule').init(module, 'mqtt');
var EventEmitter = require('eventemitter2').EventEmitter2;

module.exports = Mqtt;

function Mqtt(cfg) {
  log.info("creating new mqtt connection");
  this.client  = mqtt.connect(cfg);
  this.mqevent = new EventEmitter({
                        wildcard: true,
                        delimiter: '/'
                      });

  // Private
  var self = this;

  this.client.on('connect', function () {
    log.info("Connected");
  });

  this.client.on('message', function (topic, payload) {
    log.info("mqtt message -> %s", topic, payload.toString());
    self.mqevent.emit(topic, JSON.parse(payload.toString()));
  });
}

// subscribe to topic passed in
Mqtt.prototype.subscribe = function(topic){
  this.client.subscribe(topic);
};

// publish mqtt message
Mqtt.prototype.send = function(topic, message) {
  this.client.publish(topic, message);
};
