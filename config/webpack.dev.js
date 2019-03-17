const Webpack = require('webpack');
const merge = require('webpack-merge');
const basic = require('./webpack.basic.js');

module.exports = merge(basic, {
  entry: [
		'webpack-hot-middleware/client?reload=true&timeout=5000'
  ],

  mode: 'development',
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
  
      {
        test: /\.less$/,
        use: [ 'style-loader','css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  

  plugins: [
    new Webpack.HotModuleReplacementPlugin(),

		new Webpack.NoEmitOnErrorsPlugin()
  ]
});
