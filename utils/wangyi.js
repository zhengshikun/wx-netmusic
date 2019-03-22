const URI = 'http://localhost:3000'
const fetch = require('./fetch')

//抓取特定类型的API
function fetchApi(type, params) {
    return fetch(URI, type, params)
}
function playlist(type, count = 20){
    let params = {limit:count}
    return fetchApi(type, params)
}
function playlistmore(type,updateTime,count=6){
    let params = {before:updateTime,limit:count}
    return fetchApi(type,params)
}
function top(type, key){
    let params = {idx:key}
    return fetchApi(type,params)
}
function search(type, keywords){
    let params = {keywords:keywords}
    return fetchApi(type,params)
}
function detail(type,id){
    let params = {id:id}
    return fetchApi(type,params)
}
function songurl(type,id){
    let params = {id:id}
    return fetchApi(type,params)
}
module.exports = { fetchApi, playlist, playlistmore, top, search, detail,songurl}