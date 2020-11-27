// 引入核心库
import React from 'react'
// 引入dom库
import ReactDOM from 'react-dom'
// 引入静态资源
import './assets/css/reset.css'
import './assets/js/remScale'

// 引入路由方式
import {BrowserRouter} from 'react-router-dom'  // history
// import {HashRouter} from 'react-router-dom'


// 引入要渲染的组件
import App from './App'

// 执行渲染函数
ReactDOM.render(
<BrowserRouter>
    <React.StrictMode>
    <App/>
    </React.StrictMode>
</BrowserRouter>,
document.getElementById('root'));
// ReactDOM.render(
// <HashRouter><React.StrictMode><App/></React.StrictMode></HashRouter>,document.getElementById('root'))
