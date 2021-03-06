/*
    使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
    当你运行webpack 时，默认查找 webpack.config.js 配置文件
    需求：运行 webpack.dll.js 文件
    --> webpack --config webpack.dll.js
*/
const {
    resolve
} = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        // 最终打包生成的[name] --》 jquery
        // ['jquery'] --> 要打包的库是jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[fullhash]', // 打包的库里面向外暴露出去的内容叫什么
    },
    plugins: [
        // 打包生成一个manifest.json -->提供和jquery映射
        new webpack.DllPlugin({
            name: '[name]_[fullhash]', // 映射库的暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
        })
    ],
    mode: 'production'
};