function lookup (method, endpoint, callback, data){
  let jsonData;
  if (data){
    jsonData = JSON.stringify(data)
  }

  const xhr = new XMLHttpRequest()
  // const method ="GET"
  const url = `http://127.0.0.1:8000/api${endpoint}/`

  xhr.responseType = "json"
  xhr.open(method, url)
  xhr.onload = function(){
    callback(xhr.response, xhr.status)
  }
  xhr.onerror =  function (e) {
    console.log(e)
    callback({"message":"The request was an error."}, 400)
  }
  xhr.send(jsonData)

}

export function loadTweets(callback){
  lookup("GET", "/tweets", callback)
}