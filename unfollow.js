var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var wif = steem.auth.toWif(config.steem.username, config.steem.password, 'posting');
var followingArray = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startUnfollowingAccounts() {

	for (var i = 0; i < followingArray.length; i++) {
		let following = followingArray[i];

		let followReq = ["follow"]
		followReq.push({follower: config.steem.username, following: following, what: [""]})

		const customJson = JSON.stringify(followReq)

		console.log( followReq );

		steem.broadcast.customJsonAsync(wif, [], [config.steem.username], "follow", customJson)
		  .then(console.log)
		  .catch(console.log)

		await sleep( config.steem.delay );

	}
}

function getFollowing(start=config.steem.start,count=100) {
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
			startUnfollowingAccounts();

	});
}

getFollowing();