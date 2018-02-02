var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var wif = steem.auth.toWif(config.steem.username, config.steem.password, 'posting');
var followingArray = [];
var followersArray = [];
var _ = require('underscore');
var library = require('./library');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Unfollow accounts that are no longer followers!
async function startUnfollowingAccounts() {

  var toUnfollow = _.difference( followingArray, followersArray );

  for (var i = 0; i < toUnfollow.length; i++) {
    let follower = toUnfollow[i];

    let followReq = ["follow"]
    followReq.push({follower: config.steem.username, following: follower, what: [""]})

    const customJson = JSON.stringify(followReq)

    console.log( followReq );

    steem.broadcast.customJsonAsync(wif, [], [config.steem.username], "follow", customJson)
      .then(console.log)
      .catch(console.log)

    await sleep( config.steem.delay );

  }
}

async function startFollowingAccounts() {

  var toFollow = _.difference( followersArray, followingArray );

  console.log( 'current followers not following total: '+toFollow.length );

  for (var i = 0; i < toFollow.length; i++) {
    let follower = toFollow[i];

    let followReq = ["follow"]
    followReq.push({follower: config.steem.username, following: follower, what: ["blog"]})

    const customJson = JSON.stringify(followReq)

    console.log( followReq );

    steem.broadcast.customJsonAsync(wif, [], [config.steem.username], "follow", customJson)
      .then(console.log)
      .catch(console.log)

    await sleep( config.steem.delay );

  }
}

function finishGetFollowers(followers=[]) {
  followersArray = followers;
  startUnfollowingAccounts();
  startFollowingAccounts();
}
function finishGetFollowing(following=[]) {
  followingArray = following;
  library.getFollowers(config.steem.start,1000,finishGetFollowers)
}

//Start the chain:
library.getFollowing(config.steem.start,100,finishGetFollowing);