var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
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
      if( count === 100 )
        module.exports.getFollowers( start, count, callback );
      else
        callback(followersArray);
    });
  }
};