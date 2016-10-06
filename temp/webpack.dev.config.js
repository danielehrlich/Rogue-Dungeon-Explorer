var path = require('path');
var webpack = require('webpack');

module.exports = {
	
	entry: [
		'./src/index.js'
	],
	
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015', 'stage-1']
				}
			},
			
			{
				test: /\.css$/,
				loaders: ['style','css']
			}],
	},
	
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss']
	},
	
	devServer: {
		historyApiFallback: true,
		contentBase: './'
	}
	
	
};
