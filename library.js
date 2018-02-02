var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var wif = steem.auth.toWif(config.steem.username, config.steem.password, config.steem.auth_type);
var followingArray = [];
var followersArray = [];
var mTimeout = 0;

module.exports = {

  getFollowing: function(start=config.steem.start,count=100,callback) {
    steem.api.getFollowing(config.steem.username, start, 'blog', 100, function(err, result){

      start = '';
      count = result.length;

      for (let i = 1; i < count; i++) {
        followingArray.push(result[i].following);
        start = result[i].following;
      }

      console.log( 'following total: '+followingArray.length );

      if( count === 100 )
        module.exports.getFollowing( start, count, callback );
      else
        callback(followingArray);
    });
  },
  getFollowers: function(start='',count=1000,callback) {
    steem.api.getFollowers(config.steem.username, start, 'blog', 100, function(err, result){

      start = '';
      count = result.length;

      for (let i = 0; i < count-1; i) {
        followersArray.push(result[++i].follower);
        start = result[i].follower;
      }

      console.log( 'followers total: '+followersArray.length );

      if( count === 100 )
        module.exports.getFollowers( start, count, callback );
      else
        callback(followersArray);
    });
  },
  sendMemos: function(accounts=[]) {
    console.log( 'number of accounts:'+accounts.length );
    for (let i = 0; i < accounts.length; i++) {
      mTimeout = mTimeout + config.steem.delay;
      setTimeout( function(){
        try {
          steem.broadcast.transfer(wif, config.steem.username, accounts[i], config.steem.amount, config.steem.message, function(err, result) {
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