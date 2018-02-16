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
        if (
        	response[i].name.charAt(0) !== 'C' &&
        	response[i].name.charAt(0) !== 'c' &&
        	response[i].name.charAt(0) !== 'D' &&
        	response[i].name.charAt(0) !== 'd' &&
        	response[i].name.charAt(0) !== 'E' &&
        	response[i].name.charAt(0) !== 'e' &&
        	response[i].name.charAt(0) !== 'F' &&
        	response[i].name.charAt(0) !== 'f' &&
        	response[i].name.charAt(0) !== 'G' &&
        	response[i].name.charAt(0) !== 'g' &&
        	response[i].name.charAt(0) !== 'H' &&
        	response[i].name.charAt(0) !== 'h' &&
        	response[i].name.charAt(0) !== 'I' &&
        	response[i].name.charAt(0) !== 'i' &&
        	response[i].name.charAt(0) !== 'J' &&
        	response[i].name.charAt(0) !== 'j' &&
        	response[i].name.charAt(0) !== 'K' &&
        	response[i].name.charAt(0) !== 'k' &&
        	response[i].name.charAt(0) !== 'L' &&
        	response[i].name.charAt(0) !== 'l' &&
        	response[i].name.charAt(0) !== 'M' &&
        	response[i].name.charAt(0) !== 'm' &&
        	response[i].name.charAt(0) !== 'N' &&
        	response[i].name.charAt(0) !== 'n' &&
        	response[i].name.charAt(0) !== 'O' &&
        	response[i].name.charAt(0) !== 'o' &&
        	response[i].name.charAt(0) !== 'P' &&
        	response[i].name.charAt(0) !== 'p' &&
        	response[i].name.charAt(0) !== 'Q' &&
        	response[i].name.charAt(0) !== 'q' &&
        	response[i].name.charAt(0) !== 'R' &&
        	response[i].name.charAt(0) !== 'r' &&
        	response[i].name.charAt(0) !== 'S' &&
        	response[i].name.charAt(0) !== 's' &&
        	response[i].name.charAt(0) !== 'T' &&
        	response[i].name.charAt(0) !== 't' &&
        	response[i].name.charAt(0) !== 'U' &&
        	response[i].name.charAt(0) !== 'u' &&
        	response[i].name.charAt(0) !== 'V' &&
        	response[i].name.charAt(0) !== 'v' &&
        	response[i].name.charAt(0) !== 'W' &&
        	response[i].name.charAt(0) !== 'w' &&
        	response[i].name.charAt(0) !== 'X' &&
        	response[i].name.charAt(0) !== 'x' &&
        	response[i].name.charAt(0) !== 'Y' &&
        	response[i].name.charAt(0) !== 'y' &&
        	response[i].name.charAt(0) !== 'Z' &&
        	response[i].name.charAt(0) !== 'z'
        	) {
          filtered_accounts.push( response[i].name );
        }
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