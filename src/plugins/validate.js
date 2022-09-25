// vee-validate表单验证的插件
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'

// 使用插件
Vue.use(VeeValidate)

// 表单验证
VeeValidate.Validator.localize('zh_CN', {
    // 提示信息为中文
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的message 让确定密码和密码相同
    },
    attributes: {
        // 将提示信息中对应的key的value值改成中文
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})


// 自定义校验规则  
// 参数  agree 规则名
VeeValidate.Validator.extend('agree', {
    validate: (value) => {
        return value
    },
    getMessage: (field) => field + '必须同意'
})