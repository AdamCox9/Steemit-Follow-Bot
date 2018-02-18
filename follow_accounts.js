var config = require('./config');
var library = require('./library');
var library_auth = require('./library_auth');
var _ = require('underscore');
var following = [];

function startFollowingAccounts(accounts=[]) {
	console.log( 'got # of accounts to follow: '+accounts.length );

	let to_follow = _.difference( accounts, following );

	console.log( '# of accounts after removing current following: '+to_follow.length );
	library_auth.followAccounts(to_follow,["blog"]);
}

function finishGetFollowing(accounts=[]) {
	following = accounts;
	console.log( 'current # of following: '+following.length );

	if( config.steem.follow_accounts_from_type == "following" )
	  library.getFollowing(config.steem.follow_accounts_from,config.steem.start,100,startFollowingAccounts);
	else if( config.steem.follow_accounts_from_type == "followers" )
	  library.getFollowers(config.steem.follow_accounts_from,config.steem.start,1000,startFollowingAccounts);
	else
	  startFollowingAccounts( config.steem.accounts_to_follow );

}

library.getFollowing(config.steem.username,"",100,finishGetFollowing);