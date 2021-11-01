import React, { useEffect, useState } from 'react';
import Tweet from './components';
import { apiTweetList, apiTweetCreate } from '.';


export function TweetComponent(props){
  const textAreaRef = React.createRef()
  const [newTweets, setNewTweets] = useState([])

  const handleBackendUpdate = (response, status) => {
    let tempNewTweets = [...newTweets]
    if (status === 201){
      tempNewTweets.unshift(response)
      setNewTweets(tempNewTweets)
    } else{
      console.log(response)
      alert("An error occured. Please try again.")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newTweetValue = textAreaRef.current.value
    apiTweetCreate(newTweetValue, handleBackendUpdate)
    textAreaRef.current.value = ""
  }
  return (
    <div>
      <div className="d-lg-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center mb-4 mb-lg-0">
              <img src="%PUBLIC_URL%/assets/images/avatar/avatar.jpg" id="img-uploaded" className="avatar-xl rounded-circle" alt="" />
              <div className="ml-3">
                  <div className="d-none alert alert-danger" id="tweet-create-form-error">

                  </div>
                  <form action="" onSubmit={handleSubmit} method="POST" id="tweet-create-form" encType="multipart/form-data">
                    <textarea ref={textAreaRef} name="tweet" maxLength="" required placeholder="What's happening?" className="form-control" id="" cols="150" rows="3"></textarea>
                    <div className="mt-1">
                        <button type="submit" className="btn btn-outline-primary btn-sm">Tweet</button>
                    </div>
                  </form>
              </div>
          </div>
      </div>
      <div className="dropdown-divider"></div>
      <TweetList tweets = {newTweets}/>
    </div>
  )
}


function TweetList (props){
  
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
      apiTweetList(handleTweetListLookup)
    }
    
  }, [tweetsDidSet, setTweetsDidSet])

  return (
    <div id="tweets">
        {tweets.map((item, index)=>{
        return <Tweet tweet={item} key={`${index}-{item.id}`}/>
        })}
    
     </div>
  )
}

export default TweetList;