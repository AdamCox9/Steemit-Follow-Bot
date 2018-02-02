var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: 'wss://steemd-int.steemit.com' });

var wif = steem.auth.toWif(config.steem.username, config.steem.password, 'owner');
var start = '';
var count = 1000;
var mTimeout = 0;

function getFollowers(account=config.steem.username,start='',count=1000) {
  steem.api.getFollowers(account, start, 'blog', 1000, function(err, result){

    start = '';
    count = result.length;

    for (let i = 0; i < count; i++) {

      mTimeout = mTimeout + config.steem.delay;

	  setTimeout( function(){

	    steem.broadcast.transfer(wif, account, result[i].follower, config.steem.amount, config.steem.message, function(err, result) {
	      console.log(err, result);
	    });
	  }, mTimeout );

      start = result[i].follower;
    }

    if( count === 1000 )
      getFollowers( account, start, count );

  });
}

function getFollowing(account=config.steem.username,start='',count=100) {
  steem.api.getFollowing(account, start, 'blog', 100, function(err, result){

    start = '';
    count = result.length;

    for (let i = 0; i < count; i++) {

      mTimeout = mTimeout + config.steem.delay;

	  setTimeout( function(){

	    try {
	      steem.broadcast.transfer(wif, account, result[i].following, config.steem.amount, config.steem.message, function(err, result) {
	        console.log(err, result);
	      });
	    } catch( err ) {
	    	console.log( err );
	    }

	  }, mTimeout );

      start = result[i].following;
    }

    if( count === 100 )
      getFollowing( account, start, count );

  });
}

if( config.steem.type === 'followers')
	getFollowers(config.steem.username,config.steem.start,1000);
else if( config.steem.type === 'following')
	getFollowing(config.steem.username,config.steem.start,100);
else
	console.log( 'config.steem.type needs to be followers or following')