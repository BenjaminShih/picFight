var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// 打包入口文件
	entry: './client/js/index.js',
	output: {
		path: './dist',
		filename: 'bundle.js',
	},
	plugins: [
	    new HtmlWebpackPlugin({
	      title: 'pic fight',
	      template: 'client/index.html',
	      // 是否插入script等标签
    	  inject: true,
	    })
	],
	// 模块配置
	module: {
		// 配置加载器
		loaders: [
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.css$/, loader: ['style-loader', 'css-loader']},
		]
	},
	resolve: {
	    alias: {
	        vue: 'vue/dist/vue.js'
	    }
	}
}