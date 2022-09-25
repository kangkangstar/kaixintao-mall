// 先引入 mockjs模块
import Mock from 'mockjs'
// 把json数据格式引入【不需要暴露，直接引入】
// webpack默认对外暴露的模块:图片，JSON格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据:第一个参数请求地址  第二个参数：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner }) //模拟首页大轮播的数据
Mock.mock('/mock/floor', { code: 200, data: floor }) //楼层的数据