const webpack = require("webpack");
const path = require("path");

// Webpack Plugins
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Package.json Info
const appName = require("./package.json").name;
const appTitle = require("./package.json").description;
const version = require("./package.json").version;

// Variables
const useAnalyzer = (process.env.USE_ANALYZER && process.env.USE_ANALYZER.toLowerCase() == "true") === true;

module.exports = (env, options) => {
  const { mode } = env;

  const config = {
    entry: {
      [appName]: [path.resolve(__dirname, "./src/index.js")]
    },
    output: {
      path: path.resolve(__dirname, `dist/v${version}/`),
      filename: "[name].js"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        { 
          test: /\.less$/, // .less and .css
          use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-preset-env",
                        {
                          // Options
                          'overrideBrowserslist': ['last 2 versions']
                        },
                      ],
                      require('cssnano')({
                        preset: 'default',
                      })
                    ],
                  }
                }
              },
              'less-loader'
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        }
      ]
    },
    plugins: []
  };

  if (useAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  config.plugins.push(new ESLintPlugin({
    // See options - https://github.com/webpack-contrib/eslint-webpack-plugin#options
    fix: true, // auto fix
    exclude: "node_modules",
    context: "src",
    extensions: ["js"],
  }));

  // Environment Vars - See https://webpack.js.org/plugins/environment-plugin/
  config.plugins.push(new webpack.EnvironmentPlugin({
    // Include custom environment variables
  }));

  // If HtmlWebpackPlugin is included push to plugins
  config.plugins.push(new HtmlWebpackPlugin({
    title: appTitle,
    template: "index.html"
  }));

  // Include CSS File Bundle
  config.plugins.push(new MiniCssExtractPlugin({
    filename: `${appName}.main.min.css`,
    ignoreOrder: false
  }));

  // Development
  if (mode === "development") {
    config.devtool = "inline-source-map";
  }

  // Production 
  if (mode === "production") {
    // Production only config changes here
  }

  return config;
};