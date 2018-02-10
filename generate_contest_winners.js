var steem = require('steem');
var config = require('./config');
var library = require('./library');
var resteems = require('./resteems.temp.json')
steem.api.setOptions({ url: config.steem.url });
var followersArray = [];
var entries = [];
var contestPost = {};

function filterByFollowers() {
  var filtered_entries = [];
  for (var i = entries.length - 1; i >= 0; i--) {
  	if( followersArray.indexOf( entries[i].author ) !== -1 ) {
  		filtered_entries.push( entries[i] );
  	}
  }
  console.log( 'filtered by followers: '+filtered_entries.length );
  return filtered_entries;
}

function filterByGraphic() {
  var filtered_entries = [];
  for (var i = entries.length - 1; i >= 0; i--) {
  	if( entries[i].body.indexOf('https://steemitimages.com/') !== -1 ) {
  		filtered_entries.push( entries[i] );
  	}
  }
  console.log( 'filtered by graphic: '+filtered_entries.length );
  return filtered_entries;
}

function filterByLink() {
  var filtered_entries = [];
  for (var i = entries.length - 1; i >= 0; i--) {
  	if( entries[i].body.indexOf('https://experiments.withgoogle.com/chrome/') !== -1 ) {
  		filtered_entries.push( entries[i] );
  	}
  }
  console.log( 'filtered by link: '+filtered_entries.length );
  return filtered_entries;
}

function filterByResteem() {

  console.log( 'total resteems: '+resteems.RECORDS.length );

  var filtered_entries = [];
  for (var i = resteems.RECORDS.length - 1; i >= 0; i--) {
    for (var j = entries.length - 1; j >= 0; j--) {
      //console.log( 'record #'+i+': '+resteems.RECORDS[i].account );
      //console.log( 'entry  #'+j+': '+entries[j].author );
  	  if( resteems.RECORDS[i].account == entries[j].author ) {
  	    filtered_entries.push( entries[j] );
  	  }
  	}
  }

  console.log( 'filtered by resteem: '+filtered_entries.length );

  return filtered_entries;
}

function applyFilters() {
  entries = filterByFollowers();
  entries = filterByGraphic();
  entries = filterByLink();
  entries = filterByResteem();
}

function getContestPost() {
  /*var query = {
    tag: 'money-dreamer',
    limit: 10
  };
  steem.api.getDiscussionsByBlog(query, function (err, result) {
  	for (var i = result.length - 1; i >= 0; i--) {
  	  if( result[i].permlink == '30-sbd-webgl-screen-capture-contest' ) {
  	    contestPost = result[i];
  	    break;
  	  }
  	}
  });*/
  /*steem.api.getContent('money-dreamer', '30-sbd-webgl-screen-capture-contest', function(err, result) {
    console.log( result.reblogged_by ); //always empty array
  });*/
}

//Order entrants posts
function applyOrdering() {
  //Order replies by upvotes
  //Order replies by total number of replies/subreplies
  //Order replies by account attributes such as reputation, followers/ing, activity, sp, balances, etc...
  //Order replies by manual verification
}

function extractUrl(body,link) {
    var regex = /(https?:\/\/[^\s]+)/g;
	while((r = regex.exec(body)) !== null) {
  	  if( r[0].indexOf(link) !== -1 ) {
  	  	if( r[0].indexOf("![") !== -1 ) {
  	  	  let s = r[0].split("![");
  	  	  return s[0];
  	  	}
  	  	if( r[0].indexOf(")") !== -1 ) {
  	  	  let s = r[0].split(")");
  	  	  return s[0];
  	  	}
  	    return r[0];
  	  }
  	}
}

function printWinners( ) {
  for (var i = entries.length - 1; i >= 0; i--) {
  	let link = extractUrl( entries[i].body, 'https://experiments.withgoogle.com/chrome/' );
  	let image = extractUrl( entries[i].body, 'https://steemitimages.com/' );
  	console.log( '<hr/><img style="max-width:100;max-height:100;" src="'+image+'">' );
  	console.log( '<a href="'+link+'">overview</a> | <a href="https://steemit.com'+entries[i].url+'">entry</a> | <a href="https://steemit.com/@'+entries[i].author+'">'+entries[i].author+'</a><br><br><br>' )
  	console.log("");
  }
}

function dumpWinnerArray( ) {
  var winners = [];
  for (var i = entries.length - 1; i >= 0; i--)
  	winners.push( entries[i].author );
  console.log( winners );
}

//Get all 1st level replies
function getContestReplies() {
  steem.api.getContentReplies('money-dreamer', '30-sbd-webgl-screen-capture-contest', function(err, result) {
  	entries = result;
  	console.log( 'potential entrants: '+entries.length );
  	applyFilters();
  	applyOrdering();
  	//printWinners();
  	dumpWinnerArray();
  });
}

//Callback function for getFollowers
function finishGetFollowers(followers=[]) {
  followersArray = followers;
  console.log( 'finishGetFollowers: '+followersArray.length );
  getContestReplies();
}

//Get followers
library.getFollowers('',1000, finishGetFollowers);