const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const basic = require('./webpack.basic.js');
const Webpack = require('webpack');


module.exports = merge(basic, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        })
      
      },
  
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'less-loader'])
      }
    ]
  },
  
  plugins: [
    new ExtractTextPlugin('css/todoStyle.css'),

    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
