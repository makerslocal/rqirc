Watcher = require('rss-watcher');
var log = require('logule').init(module, 'rss');

module.exports = Rss;

function Rss(mqtt, cfg) {
  log.info("starting RSS watcher");
  watcher = new Watcher(cfg.feed)

  this.watcher.on('new article',function(article) {
    log.info(article);
  });
}
