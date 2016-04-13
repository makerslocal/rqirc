
module.exports = function(irc, mqtt) {
  require('../irc_modules/echo.js')(irc, mqtt);
  require('../irc_modules/alert.js')(irc, mqtt);
};
