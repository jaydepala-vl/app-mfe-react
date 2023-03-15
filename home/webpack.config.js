const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require('webpack');
const path = require('path');
// const DashboardPlugin = require('webpack-dashboard/plugin');

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:3001/"
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true
  },

  module: {
    rules: [
      // {
      //   test: /\.m?js/,
      //   type: "javascript/auto",
      //   resolve: {
      //     fullySpecified: false
      //   },
      // },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
        'settings': 'settings@http://localhost:3002/remoteEntry.js',
        'users': 'users@http://localhost:3003/remoteEntry.js',
        'data': 'data@http://localhost:3004/remoteEntry.js'
      },
      exposes: {
        './Navbar': './src/Navbar/Navbar.tsx',
        './useLongPress': './src/Utils/useLongPress.tsx',
        './ApiService': './src/Utils/Api.Service.tsx',
        './i18n': './src/i18n.tsx'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"]
        }
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    }),
    // new DashboardPlugin(),
  ],
};
