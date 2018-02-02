# Steemit Follow Bot

## Last Updated: 02/01/2018

This is a collection of scripts that interact with the follow functionality offered by the Steem blockchain.
This project repository will include all sub-projects that are primarily aimed at utilizing the Follow functionality that Steem offers.

## Steemit Follow Bot Updates

 - Merge deep-follow project by deleting old repository and moving script here (https://github.com/AdamCox9/Steem-Deep-Follow)
 - Clean up the code so the scripts don't have any code duplication.
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

## send_memo
NodeJS Steem/Steemit bot that sends messages as memos to followers or following.

Run bot from command line with `node send_memo.js`

This bot will send a message to all followers or following. Username and password must be set in the config.js file. The following parameters must also be set in the config.js file:

`type - followers|following`
`message - “message to be sent”`
`amount – amount of SBD|STEEM to be sent in each transaction`
`delay - time between broadcast transactions`
`start – (optional) user to start at (processes in alphanumerical order)`
`username – steem username`
`password – steem password`

## deep_follow - follow all accounts that following accounts follow

## follow_back - follow all accounts that follow current account

## follow_trending_authors - follow authors from trending tags

## library.js

## unfollow.js - unfollow all accounts

### Roadmap
 - Add criteria to filter accounts to follow:
  - Age
  - Activity
  - Balances
  - Follower Count
  - Following Count
  - Reputation
  - SP
 - Merge/copy/modify curation bot?

  - Clean up the code so the scripts don't have any code duplication.
   - Make a library with common functions
  - Add functionality to filter following by parameters such as SP, VP, Balances, Follower/ing, etc...