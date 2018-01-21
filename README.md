# Steemit-Follow-Bot

This is a collection of scripts that interact with the follow functionality offered by Steem blockchain.

## Bug Fixes
### What was the issue(s)?

The original project did not have a config or package file. 
A similar separate project/repository needed to be merged into this project/repository.
There needed to be an easy way to unfollow a very large number of accounts that are followed.

 - Add `config.js` file
 - Add `package.json` file
 - Add `unfollow.js` file
 - Add configuration to `follow-trending-authors.js` file
 - Add configuration to `deep-follow.js` file
 - Merge deep-follow project by deleting old repository and moving script here
  - Deleted https://github.com/AdamCox9/Steem-Deep-Follow

All of these files can be found on GitHub: https://github.com/AdamCox9/Steemit-Follow-Bot 

This code goes along with current post:

 - https://steemit.com/utopian-io/@money-dreamer/steem-follow-bot-updates

And, past posts:

 - https://steemit.com/utopian-io/@money-dreamer/creating-follow-bot-w-nodejs
 - https://steemit.com/utopian-io/@money-dreamer/deep-follow-nodejs-steemjs


 This project repository will include all sub-projects that are primarily aimed at utilizing the Follow functionality that Steem offers.

## Roadmap

  - Clean up the code so the scripts don't have any code duplication.
   - Make a library with common functions
  - Add functionality to filter following by parameters such as SP, VP, Balances, Follower/ing, etc...