var config = {};

config.steem = {};

//Global Configuration

config.steem.username = process.env.STEEM_USER || 'ENTER_USERNAME_HERE';
config.steem.password =  process.env.STEEM_PASSWORD || 'ENTER_PASSWORD_HERE';

//delay in milliseconds between each write transaction
config.steem.delay = 100;

//optional account to start at in alphanumerisymbolical order
//this is not applicable in follow_trending_authors
config.steem.start = "a-3";

module.exports = config;