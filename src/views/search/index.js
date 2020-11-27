import react from 'react'
//引入css
import '../../assets/css/search.css'
// 引入接口
import  {getHotSearch,getSearch} from '../../utils/axios'

class search extends react.Component {
    constructor() {
        super();
        this.state = {
            hotWord:[],
            val: '',
            songList: []
        }
    }
    // 跳播放页函数
    goPlay(id){
        this.props.history.push('/play/?id='+ id);
    }
    render() {
        const { hotWord, val ,songList} = this.state;
        return (
            <div className="search">
                {/* 搜索输入框 */}
                <div className="find">
                    <i className="sea"></i>
                    <input placeholder="搜索歌曲、歌手、专辑" onChange={this.changeVal.bind(this)}
                        className="inp"></input>
                    <em className={val ? 'show' : 'hid'} onClick={this.reset.bind(this)}>x</em>
                </div>
                {/* 热门搜索 */}
                <div className={!val ? 'hotSearch_show' : 'hotSearch_hid'}>
                    <h3>热门搜索</h3>
                    <ul>
                        {
                            hotWord.map(item => {
                                return (
                                    <li key={item.searchWord}>{item.searchWord} </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* 输入后下面显示 */}
                <div className={val ? 'keyWord_show' : 'keyWord_hid'}>
                    <h3>搜索“ {val} ”</h3>
                    <ul className="songList">
                        {
                            songList.map(item=>{
                                return (
                                    <li key={item.id}  onClick={this.goPlay.bind(this,item.id)}>
                                        <i></i>
                                        <span>{item.name} </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    };
    //  监控input输入的值
    changeVal() {
        let inp = document.querySelector('.inp');
        this.setState({
            val: inp.value
        })
        getSearch({
            keywords: inp.value
        })
        .then(res=>{
            // console.log(res.result.songs);
            if(res.code===200){
                this.setState({
                    songList: res.result.songs.filter((item,i)=>i<6)
                })
            }
        })
    };
    // 清空
    reset() {
        let inp = document.querySelector('.inp');
        this.setState({
            val: ''
        },()=>inp.value = this.state.val);
        
    }
    componentDidMount(){
        getHotSearch().then(res=>{
            // console.log(res);
            if(res.code===200){
                this.setState({
                    hotWord: res.data.filter((item,idx)=>idx<10)
                })
            }
        })
    }
}


export default search