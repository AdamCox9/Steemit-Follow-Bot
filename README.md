# Steemit Follow Bot

## Last Updated: 02/02/2018

This is a collection of scripts that interact with the follow functionality offered by the Steem blockchain.
This project repository will include all sub-projects that are primarily aimed at utilizing the Follow functionality that Steem offers.

## Steemit Follow Bot Updates II

 - Cleaned up the code so the scripts have less code duplication.
 - Make a library with common functions
 - Created `follow_back.js`
 - Merged bot to send memos to all followers/following
 - Fix minor bugs in all bots

All of these files can be found on GitHub: https://github.com/AdamCox9/Steemit-Follow-Bot 

This code goes along with current post:

 - https://steemit.com/utopian-io/@money-dreamer/steem-follow-bot-updates-ii

And, past posts:

 - https://steemit.com/utopian-io/@money-dreamer/steem-follow-bot-updates
 - https://steemit.com/utopian-io/@money-dreamer/creating-follow-bot-w-nodejs
 - https://steemit.com/utopian-io/@money-dreamer/deep-follow-nodejs-steemjs
 - https://steemit.com/utopian-io/@money-dreamer/steem-memo-bot
 - https://steemit.com/utopian-io/@money-dreamer/steem-curation-bot
 - https://steemit.com/steem/@money-dreamer/steem-javascript-development-links
 - https://steemit.com/steemit/@money-dreamer/steem-github-repository-links

## config.js - global configuration and configuration for each script

Username and password must be set in the config.js.

`delay - time between broadcast transactions`

`username – steem username`

`password – steem password`

`start – (optional) user to start at (processes in alphanumerical order)`

## send_memo.js

NodeJS Steem/Steemit bot that sends messages as memos to followers or following.

Run bot from command line with `node send_memo.js`

This bot will send a message to all followers or following. 
The following parameters must also be set in the config.js file for send_memo:

`type - followers|following`

`message - “message to be sent”`

`amount – amount of SBD|STEEM to be sent in each transaction`

## deep_follow.js - follow all accounts that following accounts follow

Run bot from command line with `node deep_follow.js`

## follow_back.js - follow all accounts that follow current account

Run bot from command line with `node follow_back.js`

## follow_trending_authors.js - follow authors from trending tags

Run bot from command line with `node follow_trending_authors.js`

## unfollow.js - unfollow all accounts

Run bot from command line with `node unfollow.js`

## library.js - common reusable functions

### Roadmap

#### Add criteria to filter accounts by:
  - Age
  - Activity
  - Balances
  - Follower Count
  - Following Count
  - Reputation
  - SP

#### Merge/copy/modify curation bot?

#### Continue cleaning up the code so the scripts don't have any code duplication.
