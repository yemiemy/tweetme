import { backendLookup } from "../lookup"

export function apiTweetCreate(newTweetData, callback){
    backendLookup("POST", "/tweets/create/", callback, {content: newTweetData})
}

export function apiTweetAction(tweetId, action, callback){
    backendLookup("POST", "/tweets/action/", callback, {id: tweetId, action:action})
}

export function apiTweetDetail(tweetId, callback){
    backendLookup("GET", `/tweets/${tweetId}/`, callback)
}

export function apiTweetList(username, callback){
    let endpoint = "/tweets/"
    if(username){
        endpoint = `/tweets/?username=${username}`
    }
    backendLookup("GET", endpoint, callback)
}