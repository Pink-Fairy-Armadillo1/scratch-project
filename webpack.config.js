const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',

    })
  ],
   module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test:/\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: ['url-loader', 'file-loader'],
      },
      {
        test: /\.mp4$/,
        exclude: /node_modules/,
        use: ['url-loader'],
      },
    ]
   },
   devServer:{
    host: '127.0.0.1',
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    proxy: {
      '/': 'http://localhost:3000',
    },
   }
}