const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 为该依赖同时开启语法转换和根据使用情况检测 polyfill
  transpileDependencies: true,
  // 关闭eslint语法校验功能,如果你想要在生产构建时禁用 eslint-loader，这样配置：lintOnSave: process.env.NODE_ENV !== 'production'
  lintOnSave: false,
  // 解决跨域，配置代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',//后端服务器
        // pathRewrite:{'^/api':''}   
      }
    }
  }
})
