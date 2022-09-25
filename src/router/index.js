// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes1'

// 使用插件
Vue.use(VueRouter)

// 引入
import store from '@/store'


// 先把VueRouter原型对象上的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push方法
// 第一个参数：告诉原来的push方法，往哪里跳，传递哪些参数
// 第二个参数：成功回调
// 第三个参数：失败的回调
// call || apply 区分
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        // 使用call 函数的上下文为VueRouter类的一个实例
        originPush.call(this, location, resolve, reject)
    } else {
        // 缺少任意一个回调，都会自动补上
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写repalce方法
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        // 使用call 函数的上下文为VueRouter类的一个实例
        originReplace.call(this, location, resolve, reject)
    } else {
        // 缺少任意一个回调，都会自动补上
        originReplace.call(this, location, () => { }, () => { })
    }

}
// 对外暴露VueRouter类的实例
let router = new VueRouter({
    // 配置路由,将在App.vue <router-view></router-view>位置展示
    routes,
    // 滚动条滚动行为：跳转detail时直接显示页面的最上面
    scrollBehavior(to, from, savedPosition) {
        // 返回 y: 0，代表滚动条在最上方，最小是0，没有负数
        return { y: 0 }
    }

})


router.beforeEach((to, from, next) => {
    //beforeEach是router的钩子函数，在进入路由前执行
    if (to.meta.title) {//判断是否有标题
        document.title = to.meta.title
    } else {
        document.title = '开心淘商城'
    }
    next()  //执行进入路由，如果不写就不会进入目标页
})


// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to:可以获取到你要跳转到哪个路由信息
    // from:可以获取到你从哪个路由而来的信息
    // next：放行函数    next()直接放行  next(path)放行到指定路由   next(false)

    // 用户登录了才会有token,未登录一定不会有token
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    // let name = localStorage.getItem('TOKEN')
    // 用户已经登录了
    if (token) {
        // 用户已经登录了，不能再去login,停留在首页 home
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            // 登录了但去的不是login[home search shopcart detail 等]
            // 如果登录了且name有，直接放行
            if (name) {
                next();
            } else {
                // 登录了但没有用户信息,派发action，让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功放行
                    await store.dispatch('getUserInfo');
                    // 放行
                    next();
                } catch (error) {
                    // token失效：退出登录里会清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录不能去交易相关（trade） 支付相关（pay paysucess） 用户中心（center）
        // 未登陆想去上面这些路由---重定向去登录页面
        let toPath = to.path
        // 包含任何一个都重定向去login页面
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // query参数，把未登陆的时候想去没去成的信息，存储与地址栏中    
            next('/login?redirect=' + toPath)
        } else {
            // 其他路由需要放行
            next();
        }
    }

})

// 对外暴露
export default router