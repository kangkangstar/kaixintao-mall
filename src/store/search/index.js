// search小仓库
import { reqGetSearchInfo } from '@/api'
// state:仓库存储数据得地方
const state = {
    searchList: {}
}

// mutations：唯一修改state的手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}

// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据，commit是从context中解构的
    async getSearchList({ commit }, params = {}) {
        // params参数：当用户派发action的时候，第二个参数传递过来的
        let result = await reqGetSearchInfo(params)//等待成功的结果，调用的时候至少传递一个空对象
        // console.log('search数据', result);// 获取不到数据
        if (result.code === 200) {
            // 提交mutation，把数据带过去
            commit('GETSEARCHLIST', result.data)
        }
    }
}

// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    // 当前形参state 当前仓库中的state,并非大仓库中的state
    goodsList(state) {
        // 返回值作为函数的返回值，如果searchList是空对象会报错
        // 计算新的属性的属性值至少返回一个空数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}