var config = {};

config.steem = {};

//Global Configuration
config.steem.username = process.env.STEEM_USER || 'ENTER_USERNAME_HERE';
config.steem.password =  process.env.STEEM_PASSWORD || 'ENTER_PASSWORD_HERE';
config.steem.url = 'wss://steemd-int.steemit.com';
config.steem.auth_type = 'owner'; //owner, posting

//delay in milliseconds between each write transaction
config.steem.delay = 10000;

//must be from username, goes with demo start.js
config.steem.sample_post = 'creating-first-steemit-bot';

//optional account to start at in alphanumerisymbolical order
//this is not applicable in follow_trending_authors, follow_back, generate_contest_winners bots
//todo - add this config to other applicable bots; create a config.steeem.end that works much the same
config.steem.start = "";

//memos only
config.steem.type =  false; //either following or followers
config.steem.message = 'Hi @username! You won 0.200 SBD in the WebGL Screen Capture Contest. See all the winners and enter next weeks contest: https://steemit.com/contest/@money-dreamer/25-sbd-webgl-screen-capture-contest'; //message to be sent in each memo (@username will be replaced)
config.steem.amount = '0.001 SBD'; //amount of SBD or STEEM to send to each follower/following
config.steem.send_memos_to = ['widia',
  'virtalch',
  'travoved',
  'topgeek',
  'teggy',
  'tech-mac',
  'sweetscentof98',
  'sunnia',
  'summer14',
  'styleit',
  'styleit',
  'sheloumith',
  'sheloumith',
  'scarletsnow',
  'scarletsnow',
  'sara-writes',
  'pegyurme',
  'pegyurme',
  'peak.endrule',
  'mrzurkon',
  'mrzurkon',
  'mahathiruddin',
  'lundgreenman',
  'laxmikadariya',
  'kunani',
  'kunani',
  'kunani',
  'kephawalks',
  'kephawalks',
  'kamesh',
  'kamesh',
  'kailukat',
  'josephlacsamana',
  'josephlacsamana',
  'josephlacsamana',
  'johnstone',
  'johnstone',
  'johnstone',
  'johnstone',
  'johnstone',
  'johnarvee12',
  'johnarvee12',
  'jerome-morales',
  'jerome-morales',
  'jerome-morales',
  'jerome-morales',
  'jaguarcars',
  'jaguarcars',
  'jaguarcars',
  'jaguarcars',
  'izaid',
  'izaid',
  'izaid',
  'ironshield',
  'ilovekrys',
  'hsqtech',
  'hsqtech',
  'hsqtech',
  'himash21',
  'himash21',
  'himash21',
  'himash21',
  'geeyang15',
  'geeyang15',
  'geeyang15',
  'fooddadiph',
  'fooddadiph',
  'fooddadiph',
  'evansbankx',
  'dotapamore',
  'dotapamore',
  'csalupado',
  'cryptohawk1',
  'cjsean',
  'carloniere',
  'carloniere',
  'carloniere',
  'bitpizza',
  'bitpizza',
  'bitpizza',
  'bitpizza',
  'bitfiend',
  'belemo',
  'armoniritmia',
  'armoniritmia',
  'armoniritmia',
  'armoniritmia',
  'amico',
  'ailenepm',
  'ailenepm',
  'ailenepm',
  'afzaal4',
  'afzaal4',
  'achmadkurniawan',
  'aamirijaz',
  'aamirijaz',
  'aamirijaz',
  'aamirijaz'];

//curation only
config.steem.curation_type =  'created'; //created, hot or trending
config.steem.tags =  ['steem','steemit','utopian-io']; //tags. leave empty for all trending tags
config.steem.vote_percent = 1; //percentage of vote for each vote

//generate_contest_winners only
config.steem.contest_permlink = '40-sbd-webgl-screen-capture-contest';//link to post where contest is being held - must be by config.steem.username set above
config.steem.contest_sublink = 'https://experiments.withgoogle.com/chrome/';//a comment entry must contain a URL with this sublink (only if require_link true)
config.steem.require_graphic = true;//a comment entry must contain an image to qualify
config.steem.require_link = true;//a comment entry must contain link with sublink to qualify
config.steem.require_followers = true;//contestents must be following to qualify
config.steem.require_resteem = true;//a comment entry must contain an image to qualify
config.steem.created_by = '';//set deadline for entries
config.steem.filter_by_date = '2018-02-15 20:27:27';//set deadline for latest update to entries, else false
config.steem.filter_by_accounts = ['money-dreamer'];//array of disqualified accounts, else false
config.steem.filter_by_disqualified = [	're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t114642362z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180211t193538521z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180211t200502158z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180211t173209683z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180211t195453063z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t211049310z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t211520405z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t103658613z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t104540420z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t111730689z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t123828873z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t123719472z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t124222691z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t213023311z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t141038939z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t145949551z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t213530670z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t152444349z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t153034593z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t234204822z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t084011154z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t150416674z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t025158029z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t025650963z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180212t062228890z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t065145604z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t220547338z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t215439805z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t203800581z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180211t025247573z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t121223289z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180212t082036933z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t175637412z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t144153441z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t143556804z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t161034457z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t212715808z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t094950619z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t201824019z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t112617598z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t110618348z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t094106519z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t130939228z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t073058832z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t015853437z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180214t192259398z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t111921814z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t095236005z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t181655732z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t223744317z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180212t081903583z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t100838375z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180212t015407779z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t212833164z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t144517787z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t114809691z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t100321254z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t213444372z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t120638164z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t050742661z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t104649533z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t033245349z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t200557955z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t144704671z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t070238044z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180208t230227225z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t025420173z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t133013417z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180211t195001944z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t090745719z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t143710236z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180214t192006278z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180209t175752810z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180211t024359189z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180214t192632148z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180211t180932359z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180210t033224913z',
										're-money-dreamer-40-sbd-webgl-screen-capture-contest-20180214t185431752z'];//an array of entry permlinks that are manually disqualified, else false


//follow_back only
config.steem.unfollow_nonfollowers = false; //if a user unfollows this account, then unfollow them

//follow_accounts only
config.steem.follow_accounts_from = 'jerrybanfield';
config.steem.accounts_to_follow = []; //this will be ignored if config.steem.follow_accounts_from is not null
config.steem.follow_accounts_type =  'following'; //either following or followers

//get_reblogs_steemsql only
config.steem.steemsql_username = 'Steemit-money-dreamer';
config.steem.steemsql_password = 'Gmt3tkmY5FBw64Htw9GH';
config.steem.steemsql_server = 'vip.steemsql.com';
config.steem.steemsql_database = 'DBSteem';

//and thats that
module.exports = config;