// Look over this later: http://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'./src/index.js'
	],
	output: {
		path: __dirname,
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-1']
			}
		},
			
			{
				test: /\.css$/,
				loader: 'style-loader'
			},
			
			{
				test: /\.css$/,
				loader: 'rpg-css-loader',
				query: {
					modules: false,
					localIdentName: '[name]__[local]___[hash:base64:5]'
				}
			}]
	},
	
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	
	devServer: {
		historyApiFallback: true,
		contentBase: './'
	},
	
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
		})
	]
};
