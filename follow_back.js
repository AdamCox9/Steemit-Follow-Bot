var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var wif = steem.auth.toWif(config.steem.username, config.steem.password, 'posting');
var followingArray = [];
var followersArray = [];
var _ = require('underscore');

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

function getFollowers(start='',count=1000) {
	steem.api.getFollowers(config.steem.username, start, 'blog', 100, function(err, result){

        start = '';
        count = result.length;

        //Skip first follower of ""
        for (let i = 0; i < count-1; i) {
        	followersArray.push(result[++i].follower);
        	start = result[i].follower;
        }

        console.log( 'current followers total: '+followersArray.length );

       	if( count === 100 )
       		getFollowers( start, count );
       	else {
          startUnfollowingAccounts();
          startFollowingAccounts();
        }
	});
}


function getFollowing(start='',count=100) {
	steem.api.getFollowing(config.steem.username, start, 'blog', 100, function(err, result){

        start = '';
        count = result.length;

        console.log( 'queue total: '+followingArray.length );

        for (let i = 1; i < count; i++) {
        	followingArray.push(result[i].following);
        	start = result[i].following;
        }

       	if( count === 100 )
       		getFollowing( start, count );
       	else
			   getFollowers();

	});
}

getFollowing();