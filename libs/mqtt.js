/**
 * Module dependencies.
 * @private
 */

var mqtt = require('mqtt');
var log = require('logule').init(module, 'mqtt');
var EventEmitter = require('eventemitter2').EventEmitter2;

/**
 * Module exports.
 *
 * variables used to interact with the coucdb database.
 *
 * @db {Object} database connection
 * @feed {Object} long polling feed connection
 * @public
 */

module.exports = Mqtt;

function Mqtt(cfg) {
  log.info("creating new mqtt connection");
  this.client  = mqtt.connect(cfg.url);
  this.mqevent  = new EventEmitter({
                        wildcard: true,
                        delimiter: '/'
                      });

  // Private
  var self = this;

  this.client.on('connect', function () {
    log.info("Connected!!!!");
  });

  this.client.subscribe("ml256/#");
  this.client.on('message', function (topic, payload) {
    log.info("received mqtt message");
    self.mqevent.emit(topic, JSON.parse(payload.toString()));
  });
}

Mqtt.prototype.send = function(topic, message) {
  client.publish(topic, message);
};
