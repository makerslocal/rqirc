# rqmailer
rqirc is a irc gateway for the [RedQueen](https://github.com/tylercrumpton/red-queen) network.  Currently it only supports the ##rqtest channel.

## Usage
* Create config/production.json and use 'export NODE_ENV=production'
** Change anything from config/default.json
```

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
