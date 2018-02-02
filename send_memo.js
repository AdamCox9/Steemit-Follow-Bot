var config = require('./config');
var library = require('./library');

if( config.steem.type === 'followers')
	library.getFollowers(config.steem.start,1000,library.sendMemos);
else if( config.steem.type === 'following')
	library.getFollowing(config.steem.start,100,library.sendMemos);
else
	console.log( 'config.steem.type needs to be followers or following')