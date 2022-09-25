import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"

// home 小仓库
// state:仓库存储数据得地方
const state = {
    // state中数据默认初始值需要根据服务器接口返回的值类型决定
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // floor楼层数据
    floorList: []
}

// mutations：唯一修改state的手段
const mutations = {
    CATEGORTLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }

}

// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据,如果成功就提交mutations去修改
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code === 200) {
            commit('CATEGORTLIST', result.data)
        }
    },
    // 获取home页面轮播图数据
    async getBannerList({ commit }) {
        let result = await reqBannerList()
        // console.log(result.data);
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    // 获取floor楼层数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code === 200) {
            // 提交mutations
            commit('GETFLOORLIST', result.data)
        }
    }
}

// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}