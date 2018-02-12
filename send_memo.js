var config = require('./config');
var library = require('./library');
var library_auth = require('./library_auth');

if( config.steem.send_memos_to !== null ) {
	library_auth.sendMemos( config.steem.send_memos_to )
	return;
}

if( config.steem.type === 'followers')
	library.getFollowers(config.steem.username,config.steem.start,1000,library_auth.sendMemos);
else if( config.steem.type === 'following')
	library.getFollowing(config.steem.username,config.steem.start,100,library_auth.sendMemos);
else
	console.log( 'config.steem.type needs to be followers or following')