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

  return res.status(200).json({followers: followerCount});
};

export default twitter;