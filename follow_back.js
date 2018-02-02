var steem = require('steem');
steem.api.setOptions({ url: config.steem.url });
var config = require('./config');
var wif = steem.auth.toWif(config.steem.username, config.steem.password, 'posting');
var followingArray = [];
var followersArray = [];
var _ = require('underscore');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startFollowingAccounts() {

//TODO print a list of followers w/@ in front of them

	followersArray = _.difference( followersArray, followingArray );

    console.log( 'current followers not following total: '+followersArray.length );


	for (var i = 0; i < followersArray.length; i++) {
		let follower = followersArray[i];

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
       	else
			startFollowingAccounts();

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