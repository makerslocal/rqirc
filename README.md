# rqmailer
rqirc is a irc gateway for the RedQueen network.  Currently it only supports the ##rqtest channel.

## Usage
* Message like this sent to [RedQueen](https://github.com/tylercrumpton/red-queen)
```
{
   "destination": "rqirc",
   "data": {
       "channel : "##rqirc"
       "message": "pizza!",
       "isaction": true
   }
}
```
* more is needed here

## Software
* [nodejs](https://nodejs.org/) - I mean?
* [nodemailer](https://github.com/martynsmith/node-irc) - irc library
* [nano](https://github.com/dscape/nano) - couchdb library
