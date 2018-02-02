var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var followingArray = [];

module.exports = {

  getFollowing: function(start=config.steem.start,count=100,callback) {
    steem.api.getFollowing(config.steem.username, start, 'blog', 100, function(err, result){

      start = '';
      count = result.length;

      console.log( 'queue total: '+followingArray.length );

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
  bar: function () {
    // whatever
  }

};