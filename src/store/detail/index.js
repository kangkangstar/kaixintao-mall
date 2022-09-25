import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index'
// 封装游客身份模块 uuid_token----> 生成一个随机的字符串
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()

}
const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取商品详情数据
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 将产品添加到购物车中(需要带参数给服务器) 也是修改商品数量的
    // 服务器存储成功后，只返回code=200，代表成功，没有返回多余数据，所以不需要三连环去存储
    // 带有async和await，如果执行会返回Promise对象【要么成功，要么失败】
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    }
}
const getters = {
    // 简化路径导航的数据
    categoryView(state) {
        // 解决数据没回来报错问题，至少是个空对象
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 简化产品售卖属性的数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}