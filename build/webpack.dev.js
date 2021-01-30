const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: './test/src/index.ts'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|eot|svg|ttf|woff|woff2|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 409600, //4096字节以上生成文件，否则base64
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, '../test'),
    compress: true,
    port: 1024
  },
  plugins: [    new CopyPlugin([{ from: "src/assets", to: "assets" }])
  ]
}
