# Steemit Follow Bot

## Last Updated: 02/02/2018

This is a collection of scripts that interact with the follow functionality offered by the Steem blockchain.
This project repository will include all sub-projects that are primarily aimed at utilizing the Follow functionality that Steem offers.

All of these files can be found on GitHub: https://github.com/AdamCox9/Steemit-Follow-Bot 

This code goes along with Steem post:

 - https://steemit.com/utopian-io/@money-dreamer/development-steem-follow-bot-updates-iii

## config.js - global configuration and configuration for each script

Username and password must be set in the config.js.

`delay - time between broadcast transactions`

`username – steem username`

`password – steem password`

## start.js - Sample bot to make 1% upvote to config.steem.sample_post

Run bot from command line with `node start.js`

## send_memo.js

NodeJS Steem/Steemit bot that sends messages as memos to followers or following.

Run bot from command line with `node send_memo.js`

This bot will send a message to all followers or following. 
The following parameters must also be set in the config.js file for send_memo:

`type - followers|following`

`message - “message to be sent”`

`amount – amount of SBD|STEEM to be sent in each transaction`

`start – (optional) user to start at (processes in alphanumerical order)`

## deep_follow.js - follow all accounts that following accounts follow

Run bot from command line with `node deep_follow.js`

## follow_back.js - follow all accounts that follow current account

Run bot from command line with `node follow_back.js`

## follow_trending_authors.js - follow authors from trending tags

Run bot from command line with `node follow_trending_authors.js`

## unfollow.js - unfollow all accounts

Run bot from command line with `node unfollow.js`

## generate_contest_winners.js - print html to display valid entries with links to profiles and entry comment

Run bot from command line with `node generate_contest_winners.js`

## get_reblogs_steemsql.js - (temporary solution) print all accounts that resteemed the post

## library.js - common reusable functions