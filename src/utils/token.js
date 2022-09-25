// 存储token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}

// 获取token(要有返回值)
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

// 清除token
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}

