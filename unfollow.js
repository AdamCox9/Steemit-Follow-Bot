var config = require('./config');
var library = require('./library');
var library_auth = require('./library_auth');

function startUnfollowingAccounts(accounts=[]) {
	library_auth.followAccounts(accounts,[""]);//empty to unfollow
}

library.getFollowing(config.steem.start,100,startUnfollowingAccounts);