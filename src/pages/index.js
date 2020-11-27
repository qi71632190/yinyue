import React from 'react'

// 引入css文件
import '../assets/css/index.css'

// 引入创建好的二级路由组件
import recommend from '../views/recommend'
import rank from '../views/rank'
import search from '../views/search'

// 引入路由相关属性
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <div >
                <div className="index">
                    <div className="header">
                    </div>
                    <div className="navBar">
                        <NavLink to="/index/recommend" activeClassName="active"><span>推荐音乐</span></NavLink>
                        <NavLink to="/index/rank" activeClassName="active"><span>热歌榜</span></NavLink>
                        <NavLink to="/index/search" activeClassName="active"><span>搜索</span></NavLink>
                    </div>
                   
                </div>
                <div className="haha"></div>
                {/* 二级路由出口 */}
                <Switch>
                    <Route path="/index/recommend" component={recommend}></Route>
                    <Route path="/index/rank" component={rank}></Route>
                    <Route path="/index/search" component={search}></Route>
                    <Redirect to="/index/recommend"></Redirect>
                </Switch>
            </div>
        )
    }
}

// 导出
export default Home