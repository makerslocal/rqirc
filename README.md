# rqmailer
rqirc is a irc gateway for the [RedQueen](https://256.makerslocal.org/wiki/RQ) network.

## Usage
* Create config/production.json and use 'export NODE_ENV=production'
** Change anything from config/default.json
docker run -d -e NODE_CONFIG="$(cat config/production.json)" itsamenathan/rqirc
```

## API
### irc
* config - options from config file
* client - client connection information
* colors - set irc colors
* rqevent.on(!event, function(msg))
** ``` msg = {
     'nick'    : nick,
     'to'      : to,
     'text'    : text,
     'message' : message,
     'reply'   : ''
 };```
* send(to, msg, actionable) - send irc message
* debugSend(doc) - print couchdb doc to debugchannel
 

## Plugins
* subscript to events on irc.rqevent
** messages are received in the following format
```
{
  "nick" : "itsamenathan",
  "to"   : "channel or nick",
  "text" : "text of message",
  "message" : "raw irc message",
  "reply" : "channel or nick to reply to"
}
* Message from couch are received in the following formate
```
{
   "destination": "rqirc",
   "data": {
       "channel : "##rqirc"
       "message": "pizza!",
       "isaction": true
   }
}

## Software
* [nodejs](https://nodejs.org/) - I mean?
* [node-irc](https://github.com/martynsmith/node-irc)
* [nano](https://github.com/dscape/nano) - couchdb library
* [config](https://github.com/lorenwest/node-config) - config management
