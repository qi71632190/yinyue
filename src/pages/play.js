import react from 'react'

// 引入css
import '../assets/css/play.css'

// 引入接口
import {songDetail,playLyric,playUrl} from '../utils/axios'
import axios from 'axios'

// 引入node中的url参数解析方法querystring
import qs from 'querystring'

class play extends react.Component{
    constructor(){
        super();
        this.state = {
            songDetail: {},
            songUrl: '',
            songName: ''
        }
    }
    render(){
        const {songDetail,songUrl,songName} = this.state;
        // console.log(songDetail);
        let picUrl = songDetail ? songDetail.picUrl: '';
        // console.log(picUrl);
        return (
            <div className="play">
                <div className="bg">
                    <div className="pan">
                    </div>
                    <img src={picUrl} />
                    <div className="bang"></div>
                    <div className="lyric">
                        <h3>{songName} </h3>
                    </div>
                    <audio src={songUrl} controls autoPlay></audio>
                </div>
            </div>
        )
    }
    componentDidMount(){
        let query = this.props.location.search.slice(1);
        // console.log(query);
        let id = qs.parse(query).id;
        // console.log(id);
        // axios并发处理
        axios.all([songDetail({ids:id}),playUrl({id}),playLyric({id})]).then(
            axios.spread((songDetail,playUrl,playLyric)=>{
                // console.log(songDetail);
                // console.log(playUrl);
                // console.log(playLyric);
                if(songDetail.code === 200){
                    this.setState({
                        songDetail : songDetail.songs[0].al,
                        songName: songDetail.songs[0].name
                    })
                }
                if(playUrl.code === 200){
                    this.setState({
                        songUrl: playUrl.data[0].url,
                    })
                }
            })
        )

    }
}

export default play;