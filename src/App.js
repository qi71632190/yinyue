//引入一级路由
import index from './pages/index'
import list from './pages/list'
import play from './pages/play'

//引入路由相关属性和方法
import { Switch, Route, Redirect } from 'react-router-dom'

// 函数创建方式
function App() {
    return (
        <div>
            {/* 一级路由出口 */}
            <Switch>
                <Route path="/index" component={index}></Route>
                <Route path="/list" component={list}></Route>
                <Route path="/play" component={play}></Route>
                <Redirect to="/index"></Redirect>
            </Switch>
        </div>
    )
}

// 导出这个函数
export default App