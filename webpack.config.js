const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "main.[contenthash].js",
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_moudles/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        loader: "html-loader",
      },
      {
        test: /\.(jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    ],
  },
  resolve: {
    extensions: [
      "*",
      ".js",
      ".jsx",
      "ts",
      "tsx",
      ".css",
      "sass",
      "scss",
      "png",
      "svg",
      "jpg",
      "jpeg",
      "gif",
      "icon",
      "woff",
      "woff2",
      "eot",
      "tff",
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
    new CleanWebpackPlugin(),
  ],
};
