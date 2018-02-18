var steem = require('steem');
var config = require('./config');
var library = require('./library');
steem.api.setOptions({ url: config.steem.url });
var followersArray = [];
var authorArray = [];
var rebloggedByArray = [];
var entryArray = [];
var contestPost = {};

function filterByAuthor() {
  let filtered_entries = [];
  for (var i = authorArray.length - 1; i >= 0; i--) {
    if( parseInt(authorArray[i].reputation) > parseInt(1000000) ) {
      filtered_accounts.push( authorArray[i].name );
    }
  }
  console.log( 'Filtered by authors: '+filtered_entries.length+'<br>' );
  return filtered_entries;
}

function filterByFollowers() {
  var filtered_entries = [];
  for (var i = entryArray.length - 1; i >= 0; i--) {
  	if( followersArray.indexOf( entryArray[i].author ) !== -1 ) {
  		filtered_entries.push( entryArray[i] );
  	}
  }
  console.log( 'Filtered by followers: '+filtered_entries.length+'<br>' );
  return filtered_entries;
}

function filterByGraphic() {
  var filtered_entries = [];
  for (var i = entryArray.length - 1; i >= 0; i--) {
  	if( entryArray[i].body.indexOf('https://steemitimages.com/') !== -1 ) {
  		filtered_entries.push( entryArray[i] );
  	}
  }
  console.log( 'Filtered by graphic: '+filtered_entries.length+'<br>' );
  return filtered_entries;
}

function filterByLink() {
  var filtered_entries = [];
  for (var i = entryArray.length - 1; i >= 0; i--) {
  	if( entryArray[i].body.indexOf(config.steem.contest_sublink) !== -1 ) {
  		filtered_entries.push( entryArray[i] );
  	}
  }
  console.log( 'Filtered by link: '+filtered_entries.length+'<br>' );
  return filtered_entries;
}

function filterByResteem() {
  var filtered_entries = [];
  for (var i = rebloggedByArray.length - 1; i >= 0; i--) {
    for (var j = entryArray.length - 1; j >= 0; j--) {
      //console.log( 'result #'+i+': '+reblogged_by[i] );
      //console.log( 'entry  #'+j+': '+entryArray[j].author );
      if( rebloggedByArray[i] == entryArray[j].author ) {
        filtered_entries.push( entryArray[j] );
      }
    }
  }
  console.log( 'Filtered by resteem: '+filtered_entries.length+'<br>' );
  return filtered_entries;
}

function filterByDisqualified() {
  var filtered_entries = [];
  for (var j = entryArray.length - 1; j >= 0; j--) {
    let disqualified = false;
    for (var i = config.steem.filter_by_disqualified.length - 1; i >= 0; i--) {
      //console.log( 'result #'+i+': '+reblogged_by[i] );
      //console.log( 'entry  #'+j+': '+entryArray[j].author );
      if( config.steem.filter_by_disqualified[i] == entryArray[j].permlink ) {
        disqualified = true;
      }
    }
    if( ! disqualified )
      filtered_entries.push( entryArray[j] )
  }
  console.log( 'Filtered by disqualified: '+filtered_entries.length+'<br>' );
  return filtered_entries;
}

function filterByDate() {
  var filtered_entries = [];

  var deadline = new Date( config.steem.filter_by_date ); 
 
  for (var j = entryArray.length - 1; j >= 0; j--) {
    //console.log( 'entry  #'+j+': '+entryArray[j].author );

    let lastUpdate = new Date( entryArray[j].last_update );

    if( lastUpdate < deadline  ) {
      filtered_entries.push( entryArray[j] );
    }
  }
  console.log( 'Filtered by date: '+filtered_entries.length+'<br>' );
  return filtered_entries;
}

function filterByAccounts() {
  var filtered_entries = [];
  for (var j = entryArray.length - 1; j >= 0; j--) {
    let disqualified = false;
    for (var i = config.steem.filter_by_accounts.length - 1; i >= 0; i--) {
      //console.log( 'result #'+i+': '+reblogged_by[i] );
      //console.log( 'entry  #'+j+': '+entryArray[j].author );
      if( config.steem.filter_by_accounts[i] == entryArray[j].author ) {
        disqualified = true;
      }
    }
    if( ! disqualified )
      filtered_entries.push( entryArray[j] )
  }
  console.log( 'Filtered by accounts: '+filtered_entries.length+'<br>' );
  return filtered_entries;
}


function applyFilters() {
  if( config.steem.require_follow )
    entryArray = filterByFollowers();
  if( config.steem.require_graphic )
    entryArray = filterByGraphic();
  if( config.steem.require_link )
    entryArray = filterByLink();
  if( config.steem.filter_by_author )
    entryArray = filterByAuthor();
  if( config.steem.require_resteem )
    entryArray = filterByResteem();
  if( config.steem.filter_by_disqualified )
    entryArray = filterByDisqualified();
  if( config.steem.filter_by_date )
    entryArray = filterByDate();
  if( config.steem.filter_by_accounts )
    entryArray = filterByAccounts();
  applyOrdering();
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
  //Order replies by date
  //Order replies by upvotes
  //Order replies by total number of replies/subreplies
  //Order replies by account attributes such as reputation, followers/ing, activity, sp, balances, etc...
  //Order replies by manual verification
  //printWinners();
  dumpWinnerArray( );
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
  for (var i = entryArray.length - 1; i >= 0; i--) {
  	let link = extractUrl( entryArray[i].body, config.steem.contest_sublink );
  	let image = extractUrl( entryArray[i].body, 'https://steemitimages.com/' );
  	console.log( '<hr/><img style="max-width:800;max-height:600;" src="'+image+'"><br>' );
  	console.log( '<h3><a href="'+link+'">overview</a> | <a href="https://steemit.com'+entryArray[i].url+'">entry</a> | <a href="https://steemit.com/@'+entryArray[i].author+'">'+entryArray[i].author+'</a></h3><br><br><br>' )
  	console.log("<br>");
  }
}

function dumpWinnerAuthors( ) {
  for (var i = entryArray.length - 1; i >= 0; i--)
    console.log( '@'+entryArray[i].author+' ' );
}

function dumpWinnerArray( ) {
  var winners = [];
  for (var i = entryArray.length - 1; i >= 0; i--)
  	winners.push( entryArray[i].author );
  console.log( winners );
}

function getAuthors(reblogged_by=[]) {
  console.log( 'Total Resteems: ' + reblogged_by.length+'<br>' );
  rebloggedByArray = reblogged_by;
  authors=[];
  for (var i = entryArray.length - 1; i >= 0; i--) {
    authors.push( entryArray[i].author );
  }
  library.getAccounts(authors,applyFilters);
}

//Get all 1st level replies
function getRebloggedBy(error, entries=[]) {
  console.log( 'Total Entries: '+entries.length+'<br>' );
  entryArray = entries;
  //console.log( JSON.stringify(entries) );
  //console.log( entries );
  library.getRebloggedBy(config.steem.username,config.steem.contest_permlink,getAuthors);
}

//Callback function for getFollowers
function getContestReplies(followers=[]) {
  console.log( 'Total Followers: '+followers.length+'<br>' );
  followersArray = followers;
  steem.api.getContentReplies(config.steem.username, config.steem.contest_permlink, getRebloggedBy);
}

//Get followers
library.getFollowers(config.steem.username,'',1000, getContestReplies);

//getContestReplies([]);