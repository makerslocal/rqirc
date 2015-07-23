
module.exports = function(irc, redqueen) {
  require('../irc_modules/echo.js')(irc, redqueen);
  require('../irc_modules/alert.js')(irc, redqueen);
};
