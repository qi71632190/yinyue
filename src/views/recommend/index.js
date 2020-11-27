// 利用类的方式创建组件
// 引入核心库
import React from 'react'
// 引入css文件
import '../../assets/css/recom.css'
// 引入swiper轮播
import 'swiper/css/swiper.css'
import 'swiper/js/swiper'
import Swiper from 'swiper'
// 引入接口
import { getRecommed, getNewSong, getBanner } from '../../utils/axios'
import axios from 'axios'
// 引入路由相关属性和方法
import { NavLink } from 'react-router-dom'

class Home extends React.Component {
    constructor() {
        super();
        // state属性-管理数据用的
        this.state = {
            imgList: [],
            songList: [],
            bannerList: []
        }
    }
    goList(id){
        this.props.history.push('/list/?id='+ id);
        console.log(id);
    }
    // 跳播放页函数
    goPlay(id){
        this.props.history.push('/play/?id='+ id);
    }
    render() {
        const { imgList, songList, bannerList } = this.state;
        return (
            <div className="recom">
                {/* - Swipe */}
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            bannerList.map(item => {
                                return (
                                    <div className="swiper-slide"
                                        key={item.imageUrl}>
                                        <img src={item.imageUrl} alt={item.typeTitle} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* <!-- Add Pagination --> */}
                    <div className="swiper-pagination swiper-pagination-white"></div>

                </div>
                <div className="cont1">
                    <h2>推荐歌单</h2>
                    <ul className="imgList">
                        {
                            imgList.map(item => {
                                return (
                                    <li key={item.id} onClick={this.goList.bind(this,item.id)}>
                                        <img src={item.picUrl}></img>
                                        <p>{item.name} </p>
                                        <div className="count">
                                            <em></em>
                                            <span>{(item.playCount / 10000).toFixed(1)}  万</span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="cont2">
                    <h2>最新音乐</h2>
                    <ul className="songList">
                        {
                            songList.map(item => {
                                return (
                                    <li key={item.id} onClick={this.goPlay.bind(this,item.id)}>
                                        <h4>{item.name} </h4>
                                        <p>{item.song.artists[0].name} - {item.song.album.name} </p>
                                        <span className="player"></span>
                                        <span className="sq"></span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    // 加载完成
    componentDidMount() {
        //  axios并发处理
        axios.all([getRecommed(), getNewSong(), getBanner()]).then(
            axios.spread((getRecommed, getNewSong, getBanner) => {
                // console.log(getRecommed);
                if (getRecommed.code === 200) {
                    this.setState({
                        imgList: getRecommed.result
                    })
                };
                if (getNewSong.code === 200) {
                    this.setState({
                        songList: getNewSong.result
                    })
                };
                if (getBanner.code === 200) {
                    // console.log(getBanner);
                    this.setState({
                        bannerList: getBanner.banners
                    }, () => {
                        // swiper
                        new Swiper('.swiper-container', {
                            loop: true,
                            autoplay: {
                                delay: 2000
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                dynamicBullets: true,
                            },
                        });
                    })
                }
            })
        )

    }
    // 更新完成
    componentDidUpdate() {
    }
}




// 导出子类
export default Home;