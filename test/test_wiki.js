var should = require('chai').should();
var rewire = require('rewire');
var alert = rewire('../irc_modules/wiki');

describe('mkMessage', function() {

  mkMessage = alert.__get__('mkMessage');

  it('should generate alteration message on wiki edit with comment', function() {
    var testData = {type: "edit", title: "Wiki Page Name", user: "tylercrumpton", revid: "1337", pageid: "12", comment: "fixed thing"};
    mkMessage(testData).should.equal('Detected alteration of wiki page [[Wiki Page Name]] by tylercrumpton ("fixed thing") - http://256.makerslocal.org/wiki?diff=1337');
  });

  it('should generate alteration message on wiki edit with no comment', function() {
    var testData = {type: "edit", title: "Wiki Page Name", user: "tylercrumpton", revid: "1337", pageid: "12"};
    mkMessage(testData).should.equal('Detected alteration of wiki page [[Wiki Page Name]] by tylercrumpton - http://256.makerslocal.org/wiki?diff=1337');
  });

  it('should generate new page message on new wiki page', function() {
    var testData = {type: "new", title: "Wiki Page Name", user: "tylercrumpton", revid: "1337", pageid: "12"};
    mkMessage(testData).should.equal('Detected creation of wiki page [[Wiki Page Name]] by tylercrumpton - http://256.makerslocal.org/wiki?curid=12');
  });

  it('should generate generic activity message on unknown wiki change type', function() {
    var testData = {type: "blah", title: "Wiki Page Name", user: "tylercrumpton", revid: "1337", pageid: "12"};
    mkMessage(testData).should.equal('Activity detected on wiki page [[Wiki Page Name]] by tylercrumpton - http://256.makerslocal.org/wiki?curid=12');
  });

})
