import { reqAddresssInfo, reqOrderInfo } from '@/api'
const state = {
    // 用户地址,初始是空数组
    address: [],
    orderInfo: {}
}
const mutations = {
    // 修改address值
    GETUSERADDRESS(state, address) {
        state.address = address
        // console.log(address);
    },
    // 修改orderInfo值
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddresssInfo()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    // 获取商品清单数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }

}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}