var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var wif = steem.auth.toWif(config.steem.username, config.steem.password, config.steem.auth_type);
var _ = require('underscore');
var following = [];
var toFollow = [];
var counter = 0;
var library = require('./library');
var library_auth = require('./library_auth');

function appendAccountsToFollow(accounts=[]) {
  toFollow = _.union( accounts, toFollow );
  console.log( "Total Accounts to Follow: "+toFollow.length );
  if( ++counter == following.length ) {
    let to_follow = _.difference( toFollow, following );
    library_auth.followAccounts(to_follow,["blog"]);
  }
}

function finishGetFollowing(accounts=[]) {

  following = accounts;
  console.log( 'Current Following Count: '+accounts.length );

  for (let i = 0; i < following.length; i++) {
    library.getFollowing(following[i],config.steem.start,100,appendAccountsToFollow);
  }
}

//Start the chain:
library.getFollowing(config.steem.username,config.steem.start,100,finishGetFollowing);