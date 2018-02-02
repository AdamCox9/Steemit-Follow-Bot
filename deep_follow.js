var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var wif = steem.auth.toWif(config.steem.username, config.steem.password, 'posting');
var followingArray = [];
var library = require('./library');

function uniq(a) {
  return a.sort().filter(function(item, pos, ary) {
    return !pos || item != ary[pos - 1];
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function followAccount(following) {

  console.log(following);

  let followReq = ["follow"]
  followReq.push({follower: config.steem.username, following: following, what: ["blog"]})

  const customJson = JSON.stringify(followReq)

  console.log( followReq );

  followingArray.push(following);

  steem.broadcast.customJsonAsync(wif, [], [config.steem.username], "follow", customJson)
    .then(console.log)
    .catch(console.log)

}

//These are the accounts of the users that you are following follow
async function getNewFollowing(account='',start='',count=100) {
  steem.api.getFollowing(account, start, 'blog', 100, function(err, result){

    start = '';
    count = result.length;

    console.log('account:'+account);

    for (let i = 0; i < count; i++) {
      let following = result[i].following;
      if( followingArray.indexOf(following) === -1 ) {
        followingArray.push(following);
        followAccount(following);
      } else {
        console.log( 'warn: already following this account')
      }
      start = following;
    }

    if( count === 100 )
      getNewFollowing( account, start, count );

  });
}

async function startFollowingAccounts(following=[]) {

  followingArray = following;
  console.log( 'startFollowingAccounts' );

  for (let i = 0; i < followingArray.length; i++) {
    getNewFollowing(followingArray[i]);
    await sleep(config.steem.delay);
  }
}

//Start the chain:
library.getFollowing(config.steem.start,100,startFollowingAccounts);