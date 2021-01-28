const path = require('path')

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  mode: 'production',
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
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib'),
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
}
