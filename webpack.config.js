const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin()

  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          "stylus-loader"
        ],
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-nanum.[ext]'
            }
          }
        ]
      }
    ]
  }
}

if (isDev) {
  config.devtool = 'eval-cheap-module-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    hot: true
    // open: true
  },
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config