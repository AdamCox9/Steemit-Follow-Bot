var steem = require('steem');
var config = require('./config');
steem.api.setOptions({ url: config.steem.url });
var wif = steem.auth.toWif(config.steem.username, config.steem.password, config.steem.auth_perm);
var followingArray = [];

function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startFollowAccountsInTrending(result) {
	var trending_tags = result.tag_idx.trending;
	for(var attributename in trending_tags) {
    	console.log(attributename+": "+trending_tags[attributename]);

		steem.api.getState('/trending/'+trending_tags[attributename], function(err, result) {
		    followAccountsInTrending(result);
		});

		await sleep(config.steem.delay);

	}
}

async function followAccountsInTrending(result) {

	var content = result.content;
	var accounts = result.accounts;


    for(var attributename in accounts) {
    	//console.log(attributename+": "+accounts[attributename]);
    	var following = accounts[attributename].name;

		if( followingArray.indexOf(following) !== -1 ) {
			console.log("This item already exists");
			continue;
		}

		let followReq = ["follow"]
		followReq.push({follower: username, following: following, what: ["blog"]})

		const customJson = JSON.stringify(followReq)

		console.log( followReq );

		followingArray.push(following);

		steem.broadcast.customJsonAsync(wif, [], [username], "follow", customJson)
		  .then(console.log)
		  .catch(console.log)

		 await sleep(config.steem.delay);

		 console.log( followingArray );

	}

}

//So we don't try to follow someone we are already following:
function getFollowing(start=config.steem.user,count=100) {
    //console.log( 'test' );
	steem.api.getFollowing(config.steem.username, start, 'blog', 100, function(err, result){

        start = '';
        count = result.length;

        //Inner loop: the followings' accounts following.
        for (let i = 0; i < count; i++) {
        	followingArray.push(result[i].following);
        	start = result[i].following;
        }

       	if( count === 100 )
       		getFollowing( start, count );
       	else
			steem.api.getState('/trending', function(err, result) {
				startFollowAccountsInTrending(result);
			});

	});
}

getFollowing();
