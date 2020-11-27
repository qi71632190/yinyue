import react from 'react'

// 引入css
import '../assets/css/list.css'
// 引入接口
import {playDetail} from '../utils/axios'
// 引入node中的url参数解析方法querystring
import qs from 'querystring'
// backgroundCoverUrl
class list extends react.Component{
    constructor(){
        super();
        this.state = {
            songList: [],
            playList: {}
        }
    }
    // 跳播放页函数
    goPlay(id){
        this.props.history.push('/play/?id='+ id);
    }
    render(){
        const {songList,playList} = this.state;
        return (
            <div className="list">
                <div className="top" >
                    <div className="bgImg">
                        <img src={playList.backgroundCoverUrl} />
                    </div>
                    <div className="left">
                        <img src={playList.coverImgUrl}></img>
                    </div>
                    <div className="right">
                        <h3>{playList.name} </h3>
                        <div className="nick">
                            <img src={playList.creator?playList.creator.avatarUrl: {}}></img>
                            <p> {playList.creator?playList.creator.nickname:''} </p>
                        </div>
                      
                    </div>
                </div>
                <div className="song">
                    <h3>歌曲列表</h3>
                    <ul className="songList">
                    {
                        songList.map((item,index)=>{
                            return (
                                <li key={item.id} onClick={this.goPlay.bind(this,item.id)}>
                                <h4>{item.name} </h4>
                                <p>{item.ar.map((ar,i)=>{
                                    return (
                                    <span key={ar.id}>{ar.name}  </span>
                                    )
                                    
                                })}  - <span>{item.name}</span></p>
                                <span className="player"></span>
                                <i className="numGray">{index+1} </i>
                            </li>
                            )
                        })
                    }
                    </ul>
                    <div className="store">
                        <div>收藏歌单</div>
                    </div>
                </div>
            </div>
        )
    }
    // 组件已加载
    componentDidMount(){
        let query = this.props.location.search.slice(1);
        // console.log(qs.parse(query).id);
        playDetail({
            id: qs.parse(query).id
        }).then((res)=>{
            // console.log(res);
            if(res.code===200){
                this.setState({
                    songList: res.playlist.tracks,
                    playList: res.playlist
                })
            }
        })
    }
}

export default list;