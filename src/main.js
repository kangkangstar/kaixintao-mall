import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

// 定义全局组件：在入口文件注册一次之后，在任何组件中都可以使用
import TypeNav from '@/components/TypeNav'  //三级联动组件-全局组件
import CarSousel from '@/components/Carsousel' // 轮播图
import Pagination from '@/components/Pagination' // 分页器

// 引入阿里图标的样式文件
import '@/assets/iconfont.css'
// 引入elementUI的组件
import { Button, MessageBox } from 'element-ui'
// 引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'
import lazy from '@/assets/lazy.gif'

// 注册全局组件：第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(CarSousel.name, CarSousel);
Vue.component(Pagination.name, Pagination)

// 注册图片懒加载插件
Vue.use(VueLazyload, {
  // 可以传配置对象
  // 懒加载默认的图片---放在assets文件中，引入使用
  loading: lazy
})

// 注册全局组件
Vue.component(Button.name, Button)
// elementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 关闭生产提示
Vue.config.productionTip = false
// 引入mockServe模拟数据
import '@/mock/mockServe'
// 引入swiper样式--入口文件引入，便于其他地方用
import 'swiper/css/swiper.css'
// 统一接收API文件里的全部请求
import * as API from '@/api'


// 引入自定义插件
import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins, {
  name: 'upper'
})

// 引入表单验证插件
import '@/plugins/validate'


new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeMount() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API // 将其挂到原型上，方便其他组件使用

  },
  // 注册路由，底下的写法是KV一致省略V【router是小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route $touter属性
  router,
  // 注册仓库:组件实例自身上会多一个$store属性
  store
}).$mount('#app')
