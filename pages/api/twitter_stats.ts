import { env } from "node:process";
import { Client } from "twitter-api-sdk";
  
const client = new Client(env.TWITTER_BEARER_TOKEN);

const twitter = async (req, res) => {

  var followerCount = 0;

  const response = await client.users.findUserByUsername("thisumang");
  let followers = await client.users.usersIdFollowers(response.data.id);

  followerCount += followers.meta.result_count;

  while(followers.meta.next_token != undefined){
    followers = await client.users.usersIdFollowers(response.data.id, {
      "pagination_token": followers.meta.next_token
    })
    followerCount += followers.meta.result_count;
  }

  let tweets = await client.tweets.usersIdTweets(response.data.id);

  var tweetCount = tweets.meta.result_count;
  while(tweets.meta.next_token != undefined){
    tweets = await client.tweets.usersIdTweets(response.data.id, {
      "pagination_token": tweets.meta.next_token
    })
    tweetCount += tweets.meta.result_count;
  }


  return res.status(200).json({followers: followerCount, tweets: tweetCount});
};

export default twitter;