// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'
// start:进度条开始    done:进度条结束
// 引入store
import store from '@/store';


// 1:利用axios对象的方法create ，去创建一个axios实例
// 2：request就是axios，只不过稍微配置以下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现 /api
    baseURL: '/api',
    // 代表请求超时的时间5s
    timeout: 5000
});

nprogress.configure({ showSpinner: true })   // 显示右上角螺旋加载提示

// 请求拦截器：在发请求之前，请求拦截器可以监测到，做一些事件
requests.interceptors.request.use((config) => {
    // 进度条开始动
    nprogress.start()
    // config：配置对象，里面有个属性很重要，headers请求头,可以携带信息给服务器，存储的是购物车数据
    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段(userTempId),不能随便写,和后台商量好
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 如果仓库有token【说明登录成功，服务器返回了token并且进行了存储】
    // 把token带给服务器,服务器才知道我们是谁,如果不带token的话,服务器会以为我们是游客登录,就拿不到用户的信息
    const token = localStorage.getItem('TOKEN')
    if (token) {
        config.headers.token = token
    }

    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以监测到，做一些事情
    // 进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
})



// 对外暴露
export default requests



