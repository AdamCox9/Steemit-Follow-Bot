var config = require('./config');
var library = require('./library');
var library_auth = require('./library_auth');

var steem = require('steem');
steem.api.setOptions({ url: config.steem.url });

function filterAccounts( accounts = [] ) {

  steem.api.getAccounts(accounts, function(err, response){
  	let filtered_accounts = [];
    for (var i = response.length - 1; i >= 0; i--) {
      if( parseInt(response[i].reputation) > parseInt(1000000) ) {
        filtered_accounts.push( response[i].name );
      }
    }

    let count = accounts.length - filtered_accounts.length;
    console.log( 'filtered accounts: ' + count );
	library_auth.sendMemos( filtered_accounts );
  });
}

if( config.steem.send_memos_to !== null ) {
	library_auth.sendMemos( config.steem.send_memos_to )
	return;
}

if( config.steem.type === 'followers')
	library.getFollowers(config.steem.username,config.steem.start,1000,filterAccounts);
else if( config.steem.type === 'following')
	library.getFollowing(config.steem.username,config.steem.start,100,filterAccounts);
else
	console.log( 'config.steem.type needs to be followers or following')