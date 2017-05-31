const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

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
    filename: `./scripts/[name].js`,
    chunkFilename: `./scripts/[id].js`,
    publicPath: ""
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
          loader: ["css-loader?sourceMap", "postcss-loader", "sass-loader"]
        })
      },
      {test: /\.html$/, loader: "raw-loader"},
      {
        test: /\.(png)|(jpg)|(gif)$/,
        loader: `url-loader?limit=20000&name=./images/[name].[ext]&publicPath=/`
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: `file-loader?name=fonts/[name].[ext]&publicPath=../`
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: `./styles/main.css`,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      template: `${SOURCE_DIST}/index.html`,
    }),
    new Visualizer()
  ],

  devtool: 'source-map'
};
