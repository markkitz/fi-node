module.exports = {
	entry: './src/main.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	resolve: {root: './src'},
    devtool: 'inline-source-map',
	module: {
		loaders: [
			{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: [ 'react', "stage-2", 'es2015']
			}
			},
			{
				test: /\.css$/, loader: "style-loader!css-loader"
			}
		]
	}
}
