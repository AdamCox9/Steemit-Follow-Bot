var config = require('./config');
var library = require('./library');
var library_auth = require('./library_auth');

function startFollowingAccounts(accounts=[]) {
	library_auth.followAccounts(accounts,["blog"]);
}

if( config.steem.follow_accounts_from !== null )
  library.getFollowing(config.steem.follow_accounts_from,config.steem.start,100,startFollowingAccounts);
else
  startFollowingAccounts( config.steem.accounts_to_follow );