import react from 'react'

// 引入css
import '../../assets/css/rank.css'
import {getHotSong} from '../../utils/axios'
 
class rank extends react.Component{
    constructor(){
        super();
        this.state = {
            songList: []
        }
    }
    // 跳播放页函数
    goPlay(id){
        this.props.history.push('/play/?id='+ id);
    }
    render(){
        const {songList} = this.state;
        return (
            <div className="rank">
               <div className="hotImg"></div>
                <ul className="songList">
                    {
                        songList.map((item,index)=>{
                            return (
                                <li key={item.id} onClick={this.goPlay.bind(this,item.id)}>
                                <h4>{item.name} </h4>
                                <p>{item.ar[0].name} - {item.al.name} </p>
                                <span className="player"></span>
                                <span className="sq"></span>
                                <i className={index+1<4 ? 'num' : 'numGray'} >{(index+1).toString().padStart(2,'0')} </i>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    componentDidMount(){
        getHotSong()
        .then(res=>{
            // console.log(res);
            if(res.code===200){
                let songList = res.playlist.tracks.filter((item,index)=>index < 20)
                // console.log(songList);
                this.setState({
                    songList 
                })
            }
        })
    }
}

export default rank;