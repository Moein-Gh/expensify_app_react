const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader','sass-loader']
      },
    ],
  },
  devtool: "eval-nosources-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback:true
  },
};
