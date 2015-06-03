var config  = GLOBAL.config;
var log     = require('logule').init(module, 'rqirc');
var couch  = require('./couch.js');
var irc     = require('./irc.js');

couch.feed.on('change', function (change) {
  log.info("change: %j", change);
  // received doc change, now get doc
  couch.db.get(change.id, function (err, doc) {
    if ( err ) { log.error("%j", err); return; }
    log.info("doc id: %s", doc._id);
    log.info("doc: %j", doc);
    try {
      //validateData(doc);
      log.info("Sending irc - [to: %s]",doc.data.channel);
      irc.client.say(doc.data.channel, irc.colors.wrap('dark_red',doc.data.message));
    }
    catch (error) {
      log.error("%s",error);
    }
  });
});

couch.feed.on('error', function(er) {
    log.error(er);
})
