import { backendLookup } from "../lookup"

export function apiTweetCreate(newTweetData, callback){
    backendLookup("POST", "/tweets/create/", callback, {content: newTweetData})
}

export function apiTweetAction(tweetId, action, callback){
    backendLookup("POST", "/tweets/action/", callback, {id: tweetId, action:action})
}

export function apiTweetList(callback){
    backendLookup("GET", "/tweets/", callback)
}