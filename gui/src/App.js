import React, { useEffect, useState } from 'react';
import Tweet from './containers/TweetFormat';


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
                        <div className="d-flex align-items-center mb-4 mb-lg-0">
                            <img src="%PUBLIC_URL%/assets/images/avatar/avatar.jpg" id="img-uploaded" className="avatar-xl rounded-circle" alt="" />
                            <div className="ml-3">
                                <div className="d-none alert alert-danger" id="tweet-create-form-error">

                                </div>
                                <form action="" method="POST" id="tweet-create-form" encType="multipart/form-data">
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
                      {tweets.map((item, index)=>{
                        return <Tweet tweet={item} key={`${index}-{item.id}`}/>
                      })}
                      
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
