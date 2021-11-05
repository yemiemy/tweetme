import React, { useState } from 'react';
import { TweetList } from '.';
import { TweetCreate } from '.';

function TweetComponent(props){
  const [newTweets, setNewTweets] = useState([])

  const canTweet = props.canTweet === "false" ? false : true
  const handleNewTweet = (newTweet) => {
    let tempNewTweets = [...newTweets]
    tempNewTweets.unshift(newTweet)
    setNewTweets(tempNewTweets)
  }

  return (
    <div>
      <div className="py-lg-6 py-4 bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div>
                <h1 className="text-white display-4 mb-0">Welcome to TweetMe!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="container"> 
            <div className="card">
                <div className="card-body">
                  <div className="d-lg-flex align-items-center justify-content-between">
                    {canTweet === true && <TweetCreate didTweet={handleNewTweet}/>}
                  </div>
                  <div className="dropdown-divider"></div>
                  <TweetList tweets = {newTweets} {...props}/>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default TweetComponent;