var steem = require('steem');
var username = 'ENTER_USERNAME_HERE';
var password = 'ENTER_PASSWORD_HERE'; 
var wif = steem.auth.toWif(username, password, 'posting');
var followingArray = [];

//Get trending/hot posts/comments from categories:

steem.api.getState('/trending', function(err, result) {
    //console.log(err, result);

	function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}


	//TODO get list of current following:


	async function followAccountsInTrending(result) {

		var content = result.content;
		var accounts = result.accounts;


	    for(var attributename in accounts) {
	    	//console.log(attributename+": "+accounts[attributename]);
	    	var following = accounts[attributename].name;

			let followReq = ["follow"]
			followReq.push({follower: username, following: following, what: ["blog"]})

			const customJson = JSON.stringify(followReq)

			console.log( followReq );

			followingArray.indexOf(following) === -1 ? followingArray.push(following) : console.log("This item already exists");

			steem.broadcast.customJsonAsync(wif, [], [username], "follow", customJson)
			  .then(console.log)
			  .catch(console.log)

			 await sleep(30000);

			 console.log( followingArray );

		}

	}

	async function startFollowAccountsInTrending(result) {
		var trending_tags = result.tag_idx.trending;
		for(var attributename in trending_tags) {
	    	console.log(attributename+": "+trending_tags[attributename]);

			steem.api.getState('/trending/'+trending_tags[attributename], function(err, result) {
			    followAccountsInTrending(result);
			});

			await sleep(30000);

		}
	}

	startFollowAccountsInTrending(result);


});
