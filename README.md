# rqirc
rqirc is a irc gateway for the [RedQueen](https://256.makerslocal.org/wiki/RQ) network.

## Usage
* Create config/production.json and use 'export NODE_ENV=production'
  * Change anything from config/default.json
* `docker run -d -e NODE_CONFIG="$(cat config/production.json)" makerslocal/rqirc`

## API
### IRC
* config - options from config file
* client - client connection information
* colors - set irc colors
* debugSend(msg) - print message to debugchannel
* send(to, msg, actionable) - send irc message
* irc.rqevent.on('msg.command', function(msg))
``` 
  msg = {
     'channel' : channel
     'command' : command,
     'nick'    : sender.nick,
     'message' : message
 };
```

### MQTT
* mqtt.send
  * `function(topic, message)`
* mqtt.subscribe('topic')
  * `mqtt.mqevent.on('topic')` - data is in format of sender

### Plugins
* go in `irc_modules` directory
* subscript to events on mqtt
** messages are received in a formate the mqtt publisher decides.

## Software
* [config](https://github.com/lorenwest/node-config) - config management
* [nodejs](https://nodejs.org/) - I mean?
* [internet-relay-chat](https://github.com/martynsmith/node-irc) - irc library
* [eventemitter2](https://www.npmjs.com/package/eventemitter2) - better event emitter
