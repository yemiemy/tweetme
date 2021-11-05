import React from 'react';
import { apiTweetCreate } from '.';

export function TweetCreate(props){
  const textAreaRef = React.createRef()
  const {didTweet} = props

  const handleBackendUpdate = (response, status) => {
    if (status === 201){
      didTweet(response)
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
  )  
}