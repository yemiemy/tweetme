import React, { useEffect, useState } from 'react';
import Tweet from './components';
import { apiTweetList } from '.';



export function TweetList (props){
  
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)
    useEffect(() => {
      let final = [...props.tweets].concat(tweetsInit)
      if (final.length !== tweets.length){
        setTweets(final)
      }
    }, [props.tweets, tweets, tweetsInit])
  
    useEffect(() => {
      if (tweetsDidSet === false){
        // do my lookup
        const handleTweetListLookup = (response, status) => {
          console.log(response, status)
          if (status === 200){
            setTweetsInit(response)
            setTweetsDidSet(true)
          }
        }
        apiTweetList(props.username, handleTweetListLookup)
      }
      
    }, [tweetsDidSet, setTweetsDidSet, props.username])
  
    const handleDidRetweet = (newTweet) => {
      const updateTweetsInit = [...tweetsInit]
      updateTweetsInit.unshift(newTweet)
      setTweetsInit(updateTweetsInit)
  
      const updateFinalTweets = [...tweets]
      updateFinalTweets.unshift(tweets)
      setTweets(updateFinalTweets)
    }
  
    return (
      <div id="tweets">
          {tweets.map((item, index)=>{
          return <Tweet didRetweet={handleDidRetweet} tweet={item} key={`${index}-{item.id}`}/>
          })}
      
       </div>
    )
  }
  