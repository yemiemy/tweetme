import React, { useState } from 'react';
import { apiTweetAction } from '.';
import '../avatar.jpg';

function ActionBtn(props){
    const {tweet, action} = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    // const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)
    const className = action.display ? action.display : "Action"
    
    const handleActionBackendEvent = (response, status) => {
      console.log(response, status)
      if (status === 200){
        setLikes(response.likes)
        // setUserLike(true)
      }
    }
    
    const handleClick = (event) => {
      event.preventDefault()
      apiTweetAction(tweet.id, action.type, handleActionBackendEvent) 
    }
    return action.type === "like" ? (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a onClick={handleClick}>
          <i className={className}></i><small>{likes}</small>
      </a>
    ) : (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a onClick={handleClick}>
          <i className={className}></i><small></small>
      </a>
    ) 
  }


export function ParentTweet(props){
  const {tweet} = props
  return tweet.parent ? <div className="border">
                          <small className="ml-3">Retweeted</small>
                          <Tweet className={'d-none'} tweet={tweet.parent} />
                        </div>
    : null
} 

function Tweet(props) {
    const {tweet} = props

    const className = props.className ? props.className : 'avatar-lg rounded-circle'

    return (
      <div>
        <div className="d-lg-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center mb-4 mb-lg-0">
            <img src="/avatar.jpg" id="img-uploaded" className={className} alt="" />
            <div className="ml-3">
              <div>
                <h4 className="mb-0">Nickname <small style={{color:"grey"}}>@username {tweet.timestamp}</small></h4>
                <p className="mb-0" id='tweet-{tweet.id}'>
                    {tweet.content}
                </p>
                <div className='btn-group d-flex' style={{cursor:"pointer"}}>
                    <div>
                      <ActionBtn tweet={tweet} action={{type: "like", display:"fe fe-heart mr-1 text-primary"}} />
                    </div>
                    <div className="ml-3">
                      <ActionBtn tweet={tweet} action={{type: "retweet", display:"fe fe-refresh-ccw mr-1 text-primary"}} />
                    </div>
                </div>
              </div>
              <ParentTweet tweet = {tweet}/>
            </div>
          </div>
        </div>
        <div className="dropdown-divider"></div>
      </div>
    )
  }

export default Tweet;