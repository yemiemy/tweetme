import { backendLookup } from "../lookup"

export function apiTweetCreate(newTweetData, callback){
    backendLookup("POST", "/tweets/create/", callback, {content: newTweetData})
}

export function apiTweetList(callback){
    backendLookup("GET", "/tweets/", callback)
}