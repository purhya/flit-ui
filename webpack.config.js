const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')


module.exports = {
	entry: path.resolve(__dirname, 'docs/index.ts'),
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
		static: path.resolve(__dirname, 'docs'),

		// 任何子地址都进入 index.html
		historyApiFallback: {
			index: 'index.html'
		},

		// 允许所有的 hosts.
		allowedHosts: 'all',
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