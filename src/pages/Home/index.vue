<template>
  <div>
    <!-- 三级联动全局组件：已经注册为全局组件，因此不需要再 import 引入了 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor组件：自己在组件内部没有发请求，数据是父组件给的 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 非路由组件在使用的时候分为三大步：定义、注册、使用
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 获取楼层信息
    this.$store.dispatch('getFloorList')
  },
  // 不能在Floor组件内部发，内部发没办法遍历出两个floor,应该在home路由中发，v-for遍历同时传递数据
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
}
</script>
<style scoped>
</style>