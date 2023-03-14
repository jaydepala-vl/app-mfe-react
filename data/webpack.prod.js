const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
	mode: "production",
  output: {
    publicPath: "http://app-mfe-react.s3-website-us-east-1.amazonaws.com/data/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3004,
    historyApiFallback: true,
  },

  module: {
    rules: [
      // {
      //   test: /\.m?js/,
      //   type: "javascript/auto",
      //   resolve: {
      //     fullySpecified: false,
      //   },
      // },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "data",
      filename: "remoteEntry.js",
      remotes: {
        'home': 'home@http://app-mfe-react.s3-website-us-east-1.amazonaws.com/home/remoteEntry.js',
        'settings': 'settings@http://app-mfe-react.s3-website-us-east-1.amazonaws.com/settings/remoteEntry.js',
        'users': 'users@http://app-mfe-react.s3-website-us-east-1.amazonaws.com/users/remoteEntry.js',
        'data': 'data@http://app-mfe-react.s3-website-us-east-1.amazonaws.com/data/remoteEntry.js'
      },
      exposes: {
        './DataList': './src/DataList/DataList.tsx'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
