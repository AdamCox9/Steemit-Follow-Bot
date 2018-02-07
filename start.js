var steem = require('steem');
var config = require('./config');

var wif = steem.auth.toWif(config.steem.username, config.steem.password, config.steem.auth_type);
steem.broadcast.vote(wif, config.steem.username, config.steem.username, config.steem.sample_post, 10000, function(err, result) {
    console.log(err, result);
});