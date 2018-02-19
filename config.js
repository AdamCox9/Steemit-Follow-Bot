var config = {};

config.steem = {};

//Global Configuration
config.steem.username = process.env.STEEM_USER || 'ENTER_USERNAME_HERE';
config.steem.password =  process.env.STEEM_PASSWORD || 'ENTER_PASSWORD_HERE';
config.steem.url = 'wss://steemd-int.steemit.com';
config.steem.auth_type = 'owner'; //owner, posting

//delay in milliseconds between each write transaction
config.steem.delay = 250;

//must be from username, goes with demo start.js only
config.steem.sample_post = 'creating-first-steemit-bot';

//optional account to start at in alphanumerisymbolical order
//this is not applicable in follow_trending_authors, follow_back, generate_contest_winners bots
//todo - add this config to other applicable bots; create a config.steeem.end that works much the same
config.steem.start = "";

//memos only
config.steem.type =  false; //either following or followers
config.steem.message = 'Hi @username!'; //message to be sent in each memo (@username will be replaced)
config.steem.amount = '0.001 SBD'; //amount of SBD or STEEM to send to each follower/following
config.steem.send_memos_to = false;//an array of accounts to send memos to, else false

//curation only
config.steem.curation_type =  'created'; //created, hot or trending
config.steem.tags =  ['steem','steemit','utopian-io']; //tags. leave empty for all trending tags
config.steem.vote_percent = 1; //percentage of vote for each vote

//generate_contest_winners only
config.steem.contest_permlink = '40-sbd-webgl-screen-capture-contest';
config.steem.contest_sublink = 'https://experiments.withgoogle.com/chrome/';
config.steem.require_graphic = true;
config.steem.require_link = true;
config.steem.require_followers = true;
config.steem.require_resteem = true;
config.steem.filter_by_date = '2018-02-15 20:27:27';
config.steem.filter_by_accounts = false;
config.steem.filter_by_disqualified = false;


//follow_back only
config.steem.unfollow_nonfollowers = false; //if a user unfollows this account, then unfollow them

//follow_accounts only
config.steem.follow_accounts_from = 'money-dreamer';
config.steem.accounts_to_follow = []; //this will be ignored if config.steem.follow_accounts_from is not false
config.steem.follow_accounts_from_type =  'followers'; //either following or followers

//get_reblogs_steemsql only
config.steem.steemsql_username = '';
config.steem.steemsql_password = '';
config.steem.steemsql_server = '';
config.steem.steemsql_database = '';

//and thats that
module.exports = config;