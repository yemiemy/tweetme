import React, { useEffect, useState } from 'react';
import Tweet from './TweetFormat';
import { loadTweets } from '../lookup';

function TweetList (){
  const [tweets, setTweets] = useState([{content: 123}])

  useEffect(() => {
    // do my lookup
    const myCallback = (response, status) => {
      console.log(response, status)
      if (status === 200){
        setTweets(response)
      }
    }
    loadTweets(myCallback)
  }, [])

  return (
    <div id="tweets">
        {tweets.map((item, index)=>{
        return <Tweet tweet={item} key={`${index}-{item.id}`}/>
        })}
    
     </div>
  )
}

export default TweetList;