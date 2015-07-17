
module.exports = function(irc, couch) {
  require('../irc_modules/echo.js')(irc,couch);
  require('../irc_modules/alert.js')(irc,couch);
};
