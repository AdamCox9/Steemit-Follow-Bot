var steem = require('steem');
steem.api.setOptions({ url: 'wss://steemd-int.steemit.com' });

var username = 'ENTER_USERNAME_HERE';
var password = 'ENTER_PASSWORD_HERE'; 
var wif = steem.auth.toWif(username, password, 'posting');
var followingArray = [];
var start = '';
var count = 100;

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
  followReq.push({follower: username, following: following, what: ["blog"]})

  const customJson = JSON.stringify(followReq)

  console.log( followReq );

  followingArray.push(following);

  steem.broadcast.customJsonAsync(wif, [], [username], "follow", customJson)
    .then(console.log)
    .catch(console.log)

}

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

async function startFollowingAccounts() {

  console.log( 'startFollowingAccounts' );

  for (let i = 0; i < followingArray.length; i++) {
  console.log( followingArray.length );
    getNewFollowing(followingArray[i]);
    await sleep(1000);
  }
}

function getCurrentFollowing(account='money-dreamer',start='',count=100) {
  steem.api.getFollowing(account, start, 'blog', 100, function(err, result){

    //console.log( err, result );

    start = '';
    count = result.length;

    for (let i = 0; i < count; i++) {
      followingArray.push(result[i].following);
      start = result[i].following;
    }

    console.log( followingArray.length );

    if( count === 100 )
      getCurrentFollowing( 'money-dreamer', start, count );
    else {
      followingArray = uniq( followingArray );
      startFollowingAccounts();
    }

  });
}

getCurrentFollowing();
