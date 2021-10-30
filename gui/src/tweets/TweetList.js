import React, { useEffect, useState } from 'react';
import Tweet from './components';
import { loadTweets } from '../lookup';

function TweetList (){
  const [tweets, setTweets] = useState([])

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