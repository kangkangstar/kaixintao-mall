<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carouse, index) in list"
        :key="carouse.id"
      >
        <img :src="carouse.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'CarSousel',
  props: ['list'],
  watch: {
    list: {
      // 立即监听：不管数据有没有变化，上来立即监听一次，不然楼层的轮播就会出现问题
      // 为什么watch监听不到list，因为数据从来没有变化（数据是父亲给的，就是一个对象，里面该有的数据都是有的）
      immediate: true,
      handler() {
        // 没有数据直接返回即可
        if (this.list.length === 0) return
        // 只能监听到数据已经有了，但是v-for动态渲染的结构还是没办法确定，需要使用nextTick，循环结束立即调用回调
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
    },
  },
}
</script>

<style>
</style>