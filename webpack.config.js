var webpack = require('webpack');

module.exports = {
	entry: './client/js/index.js',
	output: {
		path: './dist/js',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{test: /\.vue$/, loader: 'vue-loader'},
		] 
	},
	resolve: {
	    alias: {
	        vue: 'vue/dist/vue.js'
	    }
	}
}