
module.exports = function(irc, couch, redqueen) {
  require('../irc_modules/echo.js')(irc,couch, redqueen);
  require('../irc_modules/alert.js')(irc,couch, redqueen);
};
