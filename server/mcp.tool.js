import { config } from 'dotenv';
import {TwitterApi} from "twitter-api-v2"
config();

const TwitterClient =  new TwitterApi({
    appKey : process.env.TWITTER_API_KEY,
    appSecret : process.env.TWITTER_API_SECRET,
    accessToken : process.env.TWITTER_ACCESS_TOKEN,
    accessSecret : process.env.TWITTER_ACCESS_TOKEN_SECRET
})

export async function createTwitterPost (status ){
    console.log({post : status});
    const newPost = await TwitterClient.v2.tweet(status)
    return {
        content : [
            {
                type : "text" ,
                text :  `twitted : ${status}`
            }
        ]
    }
}