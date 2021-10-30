import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function handleTweetAction(tweet_id, currentCount, action) {
  const url = "{% url 'tweet_action' %}"
  const method = "POST"
  const data = JSON.stringify({
      id: tweet_id,
      action: action
  })
  const xhr = new XMLHttpRequest()
  const csrftoken = getCookie('csrftoken');
  xhr.open(method, url)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  xhr.setRequestHeader("X-CSRFToken", csrftoken)
  xhr.onload = function () {
      // loadTweets(tweetsContainerElement)
  }
  xhr.send(data)
}

function LikeBtn(tweet){
  return `
  <a onclick='handleTweetAction(${tweet.id}, ${tweet.likes}, "like")'>
      <i class="fe fe-heart mr-1 text-primary"></i><small>${tweet.likes}</small>
  </a>`
}

function UnlikeBtn(tweet){
  return `
  <a onclick='handleTweetAction(${tweet.id}, ${tweet.likes}, "unlike")'>
      <i class="fe fe-thumbs-down mr-1 text-danger"></i><small>${tweet.likes}</small>
  </a>`
}

function RetweetBtn(tweet){
  return `
  <a onclick='handleTweetAction(${tweet.id}, ${tweet.likes}, "retweet")'>
      <i class="fe fe-refresh-ccw mr-1 text-primary"></i><small>${tweet.likes}</small>
  </a>`
}


function loadTweets(callback){
  const xhr = new XMLHttpRequest()
  const method ="GET"
  const url = "http://127.0.0.1:8000/api/tweets/"
  const responseType = "json"

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    callback(xhr.response, xhr.status)
  }
  xhr.onerror =  function (e) {
    console.log(e)
    callback({"message":"The request was an error."}, 400)
  }
  xhr.send()
}

function App() {
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
    <div className="App">
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
                        <div className="d-flex align-items-center mb-4 mb-lg-0">
                            <img src="%PUBLIC_URL%/assets/images/avatar/avatar.jpg" id="img-uploaded" className="avatar-xl rounded-circle" alt="" />
                            <div className="ml-3">
                                <div className="d-none alert alert-danger" id="tweet-create-form-error">

                                </div>
                                <form action="" method="POST" id="tweet-create-form" enctype="multipart/form-data">
                                    <input type="hidden" name="next" value="/" />
                                    <textarea name="content" maxlength="" required placeholder="What's happening?" className="form-control" id="" cols="150" rows="3"></textarea>
                                    <div className="mt-1">
                                        <button type="submit" className="btn btn-outline-primary btn-sm">Tweet</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div id="tweets">
                      {tweets.map((tweet, index)=>{
                        return `
                          <div class="d-lg-flex align-items-center justify-content-between">
                          <div class="d-flex align-items-center mb-4 mb-lg-0">
                            <img src="{% static 'assets/images/avatar/avatar.jpg' %}" id="img-uploaded" class="avatar-lg rounded-circle" alt="" />
                            <div class="ml-3">
                              <h4 class="mb-0">Nickname <small style="color:grey">@username ${tweet.timestamp}</small></h4>
                              <p class="mb-0" id='tweet-${tweet.id}'>
                                  ${tweet.content}
                              </p>
                              <div class='btn-group d-flex' style="cursor:pointer;">
                                  <div>
                                      ${LikeBtn(tweet)}
                                  </div>
                                  <div class="ml-3">
                                      ${UnlikeBtn(tweet)}
                                  </div>
                                  <div class="ml-3">
                                      ${RetweetBtn(tweet)}
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        `
                      })}
                      
                    </div>
                </div>
            </div>
        </div>
    </div>




      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {tweets.map((tweet, index)=>{
            return <li>{tweet.content}</li>
          })}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
