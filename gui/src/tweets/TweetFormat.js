import '../avatar.jpg';

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
    const url = ""
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
  
function ActionBtn(props){
    const {tweet, action} = props
    return action.type === "like" ? (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a onClick={handleTweetAction(tweet.id, tweet.likes, "like")}>
        <i className="fe fe-heart mr-1 text-primary"></i><small>{tweet.likes}</small>
    </a>
    ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick='handleTweetAction({tweet.id}, {tweet.likes}, "unlike")'>
          <i className="fe fe-thumbs-down mr-1 text-danger"></i><small>{tweet.likes}</small>
      </a>
      )
  }
 
  
//   function RetweetBtn(props) {
//     const {tweet} = props
//     return (
//       // eslint-disable-next-line jsx-a11y/anchor-is-valid
//       <a onClick='handleTweetAction({tweet.id}, {tweet.likes}, "retweet")'>
//         <i className="fe fe-refresh-ccw mr-1 text-primary"></i><small>{tweet.likes}</small>
//       </a>
//     )
//   }
  
  

function Tweet(props) {
    const {tweet} = props
    return (
      <div>
        <div className="d-lg-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center mb-4 mb-lg-0">
            <img src="/avatar.jpg" id="img-uploaded" className="avatar-lg rounded-circle" alt="" />
            <div className="ml-3">
              <h4 className="mb-0">Nickname <small Style="color:grey">@username {tweet.timestamp}</small></h4>
              <p className="mb-0" id='tweet-{tweet.id}'>
                  {tweet.content}
              </p>
              <div className='btn-group d-flex' Style="cursor:pointer;">
                  <div>
                      <ActionBtn tweet={tweet} action={{type: "like"}} />
                  </div>
                  <div className="ml-3">
                    <ActionBtn tweet={tweet} action={{type: "unlike"}} />
                  </div>
                  <div className="ml-3">
                    <ActionBtn tweet={tweet} action={{type: "retweet"}} />
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown-divider"></div>
      </div>
    )
  }

  export default Tweet;