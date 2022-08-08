const {defineConfig} = require('@vue/cli-service');
const WebpackBar = require('webpackbar');
module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap:false,
    lintOnSave: false,//防止eslint报错
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
            },
        },
    },
    configureWebpack: {
        plugins: [new WebpackBar()],
    },
})
