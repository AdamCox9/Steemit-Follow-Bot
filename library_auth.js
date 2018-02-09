var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var wif = steem.auth.toWif(config.steem.username, config.steem.password, config.steem.auth_type);
var mTimeout = 0;

module.exports = {
  sendMemos: function(accounts=[]) {
    console.log( 'number of accounts:'+accounts.length );
    for (let i = 0; i < accounts.length; i++) {
      mTimeout = mTimeout + config.steem.delay;
      setTimeout( function(){
        try {
          let message = config.steem.message;
          message = message.replace( '@username', '@'+accounts[i] );
          steem.broadcast.transfer(wif, config.steem.username, accounts[i], config.steem.amount, message, function(err, result) {
            console.log(err, result);
          });
        } catch( err ) {
          console.log( err );
        }
      }, mTimeout );
    }
  },
  followAccounts: function(accounts=[],what=["blog"]) {
    console.log( 'number of accounts:'+accounts.length );
    for (let i = 0; i < accounts.length; i++) {
      mTimeout = mTimeout + config.steem.delay;
      setTimeout( function(){
        let following = accounts[i];

        let followReq = ["follow"]
        followReq.push({follower: config.steem.username, following: following, what: what})

        const customJson = JSON.stringify(followReq)

        console.log( followReq );

        steem.broadcast.customJsonAsync(wif, [], [config.steem.username], "follow", customJson)
          .then(console.log)
          .catch(console.log)

      }, mTimeout );
    }
  }
};