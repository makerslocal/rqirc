var config  = GLOBAL.config;
var log     = require('logule').init(module, 'rqirc');
var db      = require('./couch.js');
var irc     = require('./irc.js');


// follow db changes starting from now
var feed = db.follow({ since: 'now' });
feed.on('change', function (change) {
  // received doc change, now get doc
  db.get(change.id, function (err, doc) {
    if ( err ) { log.err("%j", err); return; }
    log.info("doc id: %s", doc._id);
    try {
      //validateData(doc);
      log.info("Sending irc - [to: %s]",doc.data.channel);
      irc.say(doc.data.channel, doc.data.message);
    }
    catch (error) {
      log.error("%s",error);
    }
  });
});

feed.on('error', function(er) {
  log.error(er);
});

feed.follow();
