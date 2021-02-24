const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')


module.exports = {
	entry: ['./docs/index.ts'],
	mode: 'development',

	plugins: [
		new ForkTsCheckerWebpackPlugin()
	],

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'docs/js'),
	},

	devServer: {
		// 设置域名对应的根目录.
		contentBase: path.resolve(__dirname, 'docs'),

		// 如果需要监听其他的静态内容, 则将其设置为 true.
		watchContentBase: false,

		// 重要, 设置动态内容的路由地址. 如果不设置则只有请求根目录下的 bundle.js 浏览器才会刷新.
		publicPath: '/js/',
	},
	
	devtool: 'cheap-source-map',

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						experimentalWatchApi: true,
					},
				}],
				exclude: /node_modules/
			},
			{
				test: /\.svg$/,
				use: [{
					loader: '@pucelle/webpack-svg-loader',
					options: {},
				}],
			},
		],
	},

	optimization: {
		//usedExports: true
	},
}