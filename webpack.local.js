const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: path.join(__dirname, './src/index.jsx'),
	},
	output: {
		filename: 'bundle/[name].[hash].bundle.js',
		chunkFilename: 'bundle/[name].[chunkhash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html',
		})
	],
	devServer: {
		contentBase: './dist',
		inline: true,
		historyApiFallback: true,
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					plugins: [
						"transform-class-properties",
						"syntax-dynamic-import"
					],
					presets: [
						"env",
						'react'
					]
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
		]
	}
};
