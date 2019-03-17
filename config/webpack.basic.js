const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		todo: './src/index.js',
	},

	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: 'js/[name].js',
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: ['file-loader']
			},

			{
				test: /\.js$/,
				exclude: /(node_modules|WdatePicker\.js)/,
				use: ['babel-loader']
			},

			{
				test: /\.ejs$/,
				use: ['ejs-loader']
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			inject: 'body'
		}),

		// new CleanWebpackPlugin(['dist'],{root:path.resolve(__dirname,'../')})
	]
};