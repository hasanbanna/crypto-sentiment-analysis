let credentials = require('./credentials').credentials;
let Twitter = require("twitter");
let client = new Twitter({
  consumer_key: credentials.consumer_key,
  consumer_secret: credentials.consumer_secret,
  access_token_key: credentials.access_token_key,
  access_token_secret: credentials.access_token_secret
});

let params = { q: 'Tron', lang: 'en', count: '100'};
let sentiment = require('sentiment');

let averageScore = 0;
client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
    for(tweet in tweets['statuses']){
      let currentTweet = tweets['statuses'][tweet].text;
      let tweetSentimentScore = sentiment(currentTweet).score;
      console.log("tweet: ",currentTweet, "score: ",tweetSentimentScore);
      averageScore += tweetSentimentScore
    }
    console.log("average score: ", averageScore / tweets['statuses'].length);
    // console.log(tweets);
  }else{
    console.log('error: ', error);
  }
});


