const path = require('path'); //для того чтобы превратить отнсительный путь в абсолютный мы будем использовать пакет path
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, './build'),
		// compress: true, // это ускорит загрузку в режиме разработки
		port: 3000, 
		open: true, 
		hot: true,
	},
	plugins: [new ReactRefreshWebpackPlugin()],
};
