/**
 * Module dependencies.
 * @private
 */

var nano = require('nano');
var log = require('logule').init(module, 'couch');

/**
 * Module exports.
 *
 * variables used to interact with the coucdb database.
 *
 * @db {Object} database connection
 * @feed {Object} long polling feed connection
 * @public
 */

module.exports = Couch;

function Couch(cfg) {
  log.info("creating new couchdb connection");
  var couch = nano({
    'url'      : cfg.url,
    'parseUrl' : false
  });

  this.db    = couch.db.use(cfg.db);

  this.feed  = this.db.follow({
    since        : 'now',
    include_docs : true
  });
}

