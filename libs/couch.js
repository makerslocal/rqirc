var config  = GLOBAL.config;
var log     = require('logule').init(module, 'couch');

var Couch = function(){
  var couch = require('nano')({
        "url"      : config.couch.url,
        "parseUrl" : false
      });
  this.db = couch.db.use(config.couch.db);
  this.feed = this.db.follow({
    since        : 'now',
    filter       : 'project/by_name',
    query_params : {name : config.rq.sender}
  });
  this.feed.follow();
};

module.exports = new Couch();
