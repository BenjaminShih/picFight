var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// 打包入口文件
	entry: ['webpack-hot-middleware/client', './client/js/index.js'],
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	// 按照模板生成html用于被插入bundle.js，自动引入bundle.js
	plugins: [
	    new HtmlWebpackPlugin({
	      title: 'pic fight',
	      template: 'client/index.html',
	      // 是否插入script等标签
    	  inject: true,
	    }),
	    // new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin(),
	    new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           eslint: {
		      // 以更友好的格式输出eslint错误信息
		      formatter: require('eslint-friendly-formatter')
		   },
         }
       })
	],
	// 模块配置
	module: {
		// 配置加载器
		loaders: [
			{
				test: /\.vue$/,
				loader: ['vue-loader', 'eslint-loader']
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
                loader: ['babel-loader', 'eslint-loader'],
      		},
      		// 字体文件加载器，不加会出现如下错误
      		// ERROR in ./~/iview/dist/styles/fonts/ionicons.eot?v=2.0.0
  			// Module parse failed: /Users/sjn/my-own-projects/picFight/node_modules/iview/dist/styles/fonts/ionicons.eot?v=2.0.0 Unexpected character '�' (1:0)
			// You may need an appropriate loader to handle this file type.
      		{
		        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
		        loader: 'file-loader'
		    },
		]
	},
	// 防止打包vue报错，error: You are using the runtime-only build of Vue where the template compiler is not available. 
	resolve: {
	    alias: {
	        vue: 'vue/dist/vue.js'
	    }
	}
}