import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: '',
    token: getToken(),// 登录之后刷新从本地存储取token就行了
    userInfo: {}
}

const mutations = {
    // 获取验证码
    GETCODE(state, code) {
        state.code = code
    },
    // 用户登录
    USERLOGIN(state, token) {
        state.token = token
    },
    // 获取用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state) {
        // 把仓库中相关用户信息清除
        state.token = ''
        state.userInfo = {}
        // 清除本地存储，单独封装的函数
        removeToken()

    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 正常情况是后台将验证码发送到用户手机上
        let result = await reqGetCode(phone)
        // console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册,通过数据库存储用户信息（名字，密码）
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    // 用户登录---获取token并持久化存储
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发token，用户唯一标识符
        // 将来经常通过带token找服务器要用户信息进行展示
        // 需要存储token并返回存储状态
        if (result.code == 200) {
            // 用户已经登录成功且获取到token
            commit('USERLOGIN', result.data.token)
            // 持久化存储token---也可以封装成一个函数
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录——清除token和用户信息
    async userLogout({ commit }) {
        // 只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
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