var config = {};

config.steem = {};

//Global Configuration
config.steem.username = process.env.STEEM_USER || 'ENTER_USERNAME_HERE';
config.steem.password =  process.env.STEEM_PASSWORD || 'ENTER_PASSWORD_HERE';
config.steem.url = 'wss://steemd-int.steemit.com';

//delay in milliseconds between each write transaction
config.steem.delay = 1000;

//optional account to start at in alphanumerisymbolical order
//this is not applicable in follow_trending_authors or follow_back bots
config.steem.start = "";

//memos only
config.steem.type =  'followers'; //either following or followers
config.steem.message = 'Enter the 30 SBD WebGL Screen Capture Contest - https://steemit.com/contest/@money-dreamer/30-sbd-webgl-screen-capture-contest - Un/follow to start/stop receiving these memos!'; //message to be sent in each memo
config.steem.amount = '0.001 STEEM'; //amount of SBD or STEEM to send to each follower/following


module.exports = config;