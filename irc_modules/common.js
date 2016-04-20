var log  = require('logule').init(module, 'irc_modules');
module.exports = function(irc, mqtt) {
  log.info('loading irc modules');
  require('./echo.js')(irc, mqtt);
  require('./wiki.js')(irc, mqtt);
  //require('../irc_modules/alert.js')(irc, mqtt);
};
