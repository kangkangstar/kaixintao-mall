import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串,且每次执行不能变化,游客身份持久存储
export const getUUID = () => {
    // 先看本地存储是否有 uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有
    if (!uuid_token) {
        // 生成并存储
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    // 一定要有返回值
    return uuid_token
}