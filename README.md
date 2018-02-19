# Steemit Follow Bot

## Last Updated: 02/18/2018

This is a collection of scripts that interact with the follow functionality offered by the Steem blockchain.
This project repository will include all sub-projects that are primarily aimed at utilizing the Follow functionality that Steem offers.

All of these files can be found on GitHub: https://github.com/AdamCox9/Steemit-Follow-Bot 

This code goes along with Steem post:

 - https://utopian.io/utopian-io/@money-dreamer/development-follow-bot-updates-iv

## config.js - global configuration and configuration for each script

Username and password must be set in the config.js.

`username – steem username`

`password – steem password`

`url - connect to this API sample (wss://steemd-int.steemit.com)`

`auth_type - one of the several types such as owner or posting`

`delay - time between broadcast transactions`

`start – (optional) user to start at (processes in alphanumerical order) this is currently being used across many bots but probably should be set on a per bot basis`


## start.js - Sample bot to make 1% upvote to config.steem.sample_post

Run bot from command line with `node start.js`

`sample_post - permlink of post to upvote`

## send_memo.js

NodeJS Steem/Steemit bot that sends messages as memos to followers or following.

Run bot from command line with `node send_memo.js`

This bot will send a message to all followers or following. 
The following parameters must also be set in the config.js file for send_memo:

`type - followers|following`

`message - “message to be sent”`

`amount – amount of SBD|STEEM to be sent in each transaction`

`send_memos_to - an array of accounts to send memos to, else false and will default to following/ers specified above`

## curation.js - sample bot that upvotes posts from trending categories

Run bot from command line with `node curation.js`

`curation_type - one string of an order from created, hot or trending`

`tags - an array of trending tags`

`vote_percent - (1-100)% of whole vote per upvote`

## deep_follow.js - follow all accounts that following accounts follow

Run bot from command line with `node deep_follow.js`

`todo - make it configurable`

## follow_back.js - follow all accounts that follow current account

Run bot from command line with `node follow_back.js`

`unfollow_nonfollowers - if a user unfollows this account, then unfollow them`

## follow_trending_authors.js - follow authors from trending tags

Run bot from command line with `node follow_trending_authors.js`

## follow_accounts.js - follow accounts from a user or array

Run bot from command line with `node follow_trending_authors.js`

`follow_accounts_from - account name to get followers/ing from`

`accounts_to_follow - this will be ignored if config.steem.follow_accounts_from is not false`

`follow_accounts_from_type - either following or followers`

## unfollow.js - unfollow all accounts

Run bot from command line with `node unfollow.js`

## generate_contest_winners.js - print html to display valid entries with links to profiles and entry comment

Run bot from command line with `node generate_contest_winners.js`

`config.steem.contest_permlink - permlink to post where contest is being held - must be authored by config.steem.username set above`

`config.steem.contest_sublink - a comment entry must contain a URL with this sublink (only if require_link true)`

`config.steem.require_graphic - a comment entry must contain an image to qualify`

`config.steem.require_link - a comment entry must contain link with sublink to qualify`

`config.steem.require_followers - contestents must be following to qualify`

`config.steem.require_resteem - a comment entry must contain an image to qualify`

`config.steem.filter_by_date - set deadline (date format) for latest update to entries, else false`

`config.steem.filter_by_accounts - array of disqualified accounts, else false`

`config.steem.filter_by_disqualified - an array of entry permlinks that are manually disqualified, else false`

## get_reblogs_steemsql.js - (temporary solution) print all accounts that resteemed the post

Run bot from command line with `node get_reblogs_steemsql.js`

`config.steem.steemsql_username = '';`
`config.steem.steemsql_password = '';`
`config.steem.steemsql_server = '';`
`config.steem.steemsql_database = '';`

## library.js - common reusable functions
