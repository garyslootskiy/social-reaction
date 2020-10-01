const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});
module.exports = {
  entry: "./src/index.js",
  output: { 
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  plugins: [htmlPlugin],
  devServer: {
  //   publicPath: '/dist',
    proxy: {
      '/api': 'http://localhost:3000/',
      '/signup': 'http://localhost:3000/',
      '/signin': 'http://localhost:3000/',
      '/db': 'http://localhost:3000/',
      '/logout': 'http://localhost:3000/'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: { name: '/static/[name].[ext]' }
      }
    ]
  }
};