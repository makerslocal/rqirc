var Watcher = require('feed-watcher');
var log = require('logule').init(module, 'rss');

module.exports = Rss;

function Rss(mqtt, cfg) {
  log.info("starting RSS watcher");
  this.watcher = new Watcher(cfg.feed)
  this.watcher.start();

  this.watcher.on('new entries', function(entries) {
    entries.forEach(function (entry) {
      log.info(entry);
      var msg = {
                'title' : entry.title,
                'link'    : entry.link,
                'author' : entry.author
                };
      mqtt.send('ml256/blog/post', JSON.stringify(msg));
    })
  });

  this.watcher.on('error', function (error) {
    log.error(error);
  });
}
