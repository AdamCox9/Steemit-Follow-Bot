var steem = require('steem');
var config = require('./config');
var mTimeout = 0;
var upvoted = [];
var regex1 = RegExp('^[\x20-\x7F]+$');

steem.api.setOptions({ url: 'wss://steemd-int.steemit.com' });

var wif = steem.auth.toWif(config.steem.username, config.steem.password, 'owner');

function processTag(tag='') {
	let attributename = tag;

	mTimeout = mTimeout + config.steem.delay;
	setTimeout( function() {

		steem.api.getState(config.steem.type+'/'+attributename, function(err, result) {

		  	for( var post in result.content ) {

		  		let data = result.content[post];

		  		if( data.allow_votes === true && data.allow_curation_rewards === true && data.author_reputation > 300000000000 ) {
		  			let already_voted = false;
		  			for (var j = data.active_votes.length - 1; j >= 0; j--)
						if( data.active_votes[j].voter == 'money-dreamer' ) {
							already_voted = true;
							continue;
						}

				  	if( already_voted === false ) {

				  		if( upvoted.indexOf( data.title ) === -1 ) {

				  			upvoted.push( data.title );

				  			if( regex1.test(data.title) ) {
								console.log( 'upvoting '+data.title );

								mTimeout = mTimeout + config.steem.delay;
								setTimeout( function() {
								  try {
								  	steem.broadcast.vote(wif, config.steem.username, data.author, data.permlink, 100, function(err, result) {
								      console.log(err, result);
								    });
								  } catch( err ) {
								  	console.log( err );
								  }
								}, mTimeout * 1000);
							}
						}
					}
				}
			}

		});
	}, mTimeout * 1000);
}

function startProcessing() {
	if( config.steem.tags.length > 0 )
		for (var i = config.steem.tags.length - 1; i >= 0; i--)
			processTag( config.steem.tags[i] );
	else
		steem.api.getState(config.steem.type, function(err, result) {
			for(var i = result.tag_idx.trending.length - 1; i >= 0; i--)
				processTag(result.tag_idx.trending[i]);
		});
}

startProcessing();