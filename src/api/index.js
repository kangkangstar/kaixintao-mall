// 对API进行统一管理
// 引入二次封装的axios(带有请求，响应拦截器)
import requests from "./request";
import requestMock from '@/api/requestMock'

// 三级联动接口
// /api/product/getBaseCategoryLis   方式：get   无参数
// 发请求：axios发请求返回结果是一个Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// home页面轮播图
export const reqBannerList = () => requestMock.get(`/banner`)

// floor楼层数据
export const reqFloorList = () => requestMock.get('/floor')

// 搜索模块数据
// /api/list   方式：post  带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/

// 当前这个接口，给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取商品详情信息  url :/item/${skuId}   get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车（或更新某一个产品的个数）  url :/cart/addToCart/${skuId}/${skuNum}   post  带两个参数
// skuNum指定为改变的数量, 如果是减少就是负数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表的接口  url:/cart/cartList  get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车产品的接口
//  url: /api/cart/delteCart/{skuId}  delete
export const reqDeleteCartById = (skuId) => requests({ url: `cart/deleteCart/${skuId}`, method: 'delete' })

// 修改商品的选中状态（用不了）
//  url:/api/cart/checkCart/{skuID}/{isChecked}    GET (新修改的)
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })

// user---获取验证码的接口
//  url:/api/user/passport/sendCode/{phone}  get 带参数phone
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// user--- 注册用户
// url: /api/user/passport/register  method:post 
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })

//  user---用户登录
// url :/api/user/passport/login post  参数：phone password
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

//  user---获取用户信息
// url: /api/user/passport/auth/getUserInfo  get 
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

//  user---退出登录
//  url:/user/passport/logout  get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// trade---获取用户地址信息  get  无参数
export const reqAddresssInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// trade---获取商品清单数据  get  
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// trade---提交订单数据  post    参数 tradeNo  data
// URL: /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// pay---获取支付信息
// URL ：/api/payment/weixin/createNative/{orderId}  get  参数：orderId
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取订单的支付状态
// URL: /api/payment/weixin/queryPayStatus/{orderId}  GET
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// center---获取我的订单列表
// url:/api/order/auth/{page}/{limit}   get  参数： page(页码) limit(每页显示数量)
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })