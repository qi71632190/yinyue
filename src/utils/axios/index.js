import http from './axios'

// ------------------ 推荐音乐页 ----------
// 封装推荐歌单接口
export function getRecommed(){
    return http.get('/personalized?limit=6')
}

// 最新音乐
export function getNewSong(){
    return http.get('/personalized/newSong')
}
// 轮播图
export function getBanner(){
    return http.get('/banner')
}

// ------------------ 热歌榜页-----------
export function getHotSong(){
    return http.get('/top/list?id=3778678')
}

// 获取歌单详情
export function playDetail(params){
    return http.get('/playlist/detail',{
        params
    })
}
// 获取歌曲详情
export function songDetail(params){
    return http.get('/song/detail',{
        params
    })
}
//获取音乐URL
export function playUrl(params){
    return http.get('/song/url',{
        params
    })
}
//获取歌词
export function playLyric(params){
    return http.get('/Lyric',{
        params
    })
}
// ------------------- --
//热搜列表
export function getHotSearch(){
    return http.get('/search/hot/detail')
}

//封装一个搜索接口
export function getSearch(params){
    return http.get('/search',{
        params
    })
}