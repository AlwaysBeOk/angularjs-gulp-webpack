const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const config = require('./config');
const SOURCE_DIST = config.SOURCE_DIST;
const BUILD_DIST = config.BUILD_DIST;

module.exports = {

  entry: {
    app: `${SOURCE_DIST}/app.js`,
    vendor: ['angular', 'angular-animate', 'angular-resource', 'angular-route', 'angular-aria', 'angular-material', 'angular-material-data-table']
  },

  output: {
    /* global __dirname */
    path: path.join(__dirname, BUILD_DIST),
    filename: `scripts/[name].[chunkhash:8].js`,
    chunkFilename: `scripts/[id].[chunkhash:8].js`,
    publicPath: "./"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract({
        notExtractLoader: "style-loader",
        loader: ["css-loader?sourceMap", "postcss-loader"]
      })
      },
      {
        test: /\.scss$/, loader: ExtractTextPlugin.extract({
        notExtractLoader: "style-loader",
        loader: ["css-loader", "postcss-loader", "sass-loader"]
      })
      },
      { test: /\.html$/, loader: "raw-loader" },
      {
        test: /\.(png)|(jpg)|(gif)$/,
        loader: `url-loader?limit=20000&name=images/[name].[hash:8].[ext]&publicPath=/` },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: `file-loader?name=fonts/[name].[hash:8].[ext]&publicPath=../`
      }
    ]
  },

  plugins: [
    new ngAnnotatePlugin({
      add: true
    }),
    new ExtractTextPlugin({
      filename: `styles/main.[contenthash:8].css`,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      template: `${SOURCE_DIST}/index.html`,
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],

};
