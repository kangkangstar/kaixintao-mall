// Vue插件一定暴露一个对象
let myPlugins = {}

// 身上有install方法
myPlugins.install = function(Vue, options) {
    // Vue.prototype.$bus  任何组件都可以使用
    // Vue.directive  全局指令
    // Vue.component 全局组件
    Vue.directive(options.name, (element, params) => {
        // 操作dom
        element.innerHTML = params.value.toUpperCase()
        // 使用的时候直接  v-upper  调用此方法
    })

}

export default myPlugins