import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        // console.log(result);
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },

    // 删除购物车某一个产品(返回data为空，不需要再三连环了)
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 修改产品是否选中（用不了）
    async updateCheckdById({ commit }, skuId, isChecked) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        console.log(result, '修改产品选中状态');
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 删除全部选中的商品
    // actions 的context上下文对象中可以解构出 dispatch【派发action】,getters【计算属性】,commit【提交mutations修改state】,state【当前仓库数据】
    deleteAllCheckedCart({ dispatch, getters }) {
        // 获取购物车全部商品[是一个数组]
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            // 只删除勾选的商品,遍历进行删除，调用之前删除某一个商品的action，每次的返回值都是一个Promise对象
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            // 将每一次返回的promise添加到数组中
            PromiseAll.push(promise)
        });
        // 只有全部的 p1 p2 ...都成功才成功，一个失败就是失败
        return Promise.all(PromiseAll)
    },

    // 底部全部选中的复选框（用不了）
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        // 获取购物车全部商品[是一个数组]
        let PromiseAll = []
        state.cartList.cartInfoList.forEach(item => {
            // 每一次都派发actions
            let result = dispatch('updateCheckdById', { skuId: item.skuId, isChecked })
            // 将每一次的promise对象push进提前准备好的数组中
            PromiseAll.push(result)
        })
        // 通过Promise.all判断全部的执行结果
        return Promise.all(PromiseAll)
    },

}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}