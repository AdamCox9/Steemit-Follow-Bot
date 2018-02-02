var config = require('./config');
var library = require('./library');

function startUnfollowingAccounts(accounts=[]) {
	library.followAccounts(accounts,[""]);//empty to unfollow
}

library.getFollowing(config.steem.start,100,startUnfollowingAccounts);