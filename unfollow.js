var steem = require('steem');
var config = require('./config');
var library = require('./library');

steem.api.setOptions({ url: config.steem.url });

var wif = steem.auth.toWif(config.steem.username, config.steem.password, 'posting');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startUnfollowingAccounts(followingArray=[]) {

	console.log( followingArray.length );

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


library.getFollowing(config.steem.start,100,startUnfollowingAccounts);