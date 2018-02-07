var config = require('./config');
var library = require('./library');
var library_auth = require('./library_auth');
var _ = require('underscore');

var followingArray = [];
var followersArray = [];

function finishGetFollowers(followers=[]) {

  followersArray = followers;

  //Unfollow accounts that are no longer followers but were before:
  var toUnfollow = _.difference( followingArray, followersArray );
  console.log( 'old followers not following anymore: '+toUnfollow.length );
  library_auth.followAccounts( toUnfollow, [""] );

  //Follow accounts that are now followers but weren't before:
  var toFollow = _.difference( followersArray, followingArray );
  console.log( 'current followers not following before: '+toFollow.length );
  library_auth.followAccounts( toFollow, ["blog"] );

}
function finishGetFollowing(following=[]) {
  followingArray = following;
  library.getFollowers(config.steem.start,1000,finishGetFollowers)
}

//Start the chain:
library.getFollowing(config.steem.start,100,finishGetFollowing);