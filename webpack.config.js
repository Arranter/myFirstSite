/* webpack.config.js */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: false,
  optimization: {
    minimize: false,
  },
  entry: {
    app: [
      './src/index.js',
      './src/main.css',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: './assets',
    }]),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: './assets/fonts/[name].[ext]',
          },
        }],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '../assets/images/[name].[ext]',
          },
        }],
      },
    ],
  },
};
