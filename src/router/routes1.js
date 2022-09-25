// 引入一级路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from "@/pages/PaySuccess"
import Center from '@/pages/Center'
// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

export default [
    // 第一：路径的前面需要有 / (二级路由没有)
    // 第二：路径单词都是小写
    {
        path: '/center',
        component: Center,
        meta: { show: true }, // 利用路由源信息对底部Footer进行显示与隐藏的操作
        children: [
            {
                path: 'myorder',
                component: myOrder
            },
            {
                path: 'grouporder',
                component: groupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'

            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有从shopcart的结算按钮过来才能放行
            if (from.path == '/trade') {
                next()
            } else {
                // 重置到from路由对应的地址，从哪来回哪去
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有从shopcart的结算按钮过来才能放行
            if (from.path == '/shopcart') {
                next()
            } else {
                // 重置到from路由对应的地址，从哪来回哪去
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true } // 利用路由源信息对底部Footer进行显示与隐藏的操作
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: true } // 利用路由源信息对底部Footer进行显示与隐藏的操作
    },
    {
        path: '/home',
        component: Home,
        meta: { show: true, title: "商城首页" }
    },
    {
        path: '/search/:keyword?',//需要占位的是params参数,问号表示可传可不传 ？（正则：代表出现次数 0|1）
        component: Search,
        meta: { show: true },
        name: 'search',
        // 路由组件能不能传递props参数---如果声明了没接收，会以$attrs的形式收集到组件身上，接收了就会收集到props上
        // 布尔值写法:只能是params参数
        // props: true,
        // 对象写法：额外给路由组件传递一些props
        // props: { a: 1, b: 2 }
        // 函数写法：params和query都可以通过props传递给路由组件
        props: ($route) => {
            return {
                keyword: $route.params.keyword,
                k: $route.query.k
            }
        }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    // 重定向，在项目跑起来的时候，访问 /  立马让定向到首页
    {
        path: '*',
        redirect: '/home'
    }

]