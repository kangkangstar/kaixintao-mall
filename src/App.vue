<template>
  <div>
    <Header></Header>
    <!-- 路由组件展示的地方 -->
    <router-view></router-view>
    <!-- 在Home Search显示的，在登录，注册隐藏 -->
    <!-- 方法一：路由比较少的时候可以，多了之后需要写的代码过多 -->
    <!-- <Footer
      v-show="$route.path == '/home' || $route.path == '/search'"
    ></Footer> -->
    <!-- 方法二：利用路由meta属性进行设置，推荐做法 -->
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知Vuex发请求，获取商品分类得三级列表数据，存储与仓库中，只加载一次
    this.$store.dispatch('categoryList')
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
