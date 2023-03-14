const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
	mode: "production",
  output: {
    publicPath: "https://app-mfe-react.s3.amazonaws.com/settings/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3002,
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
      name: "settings",
      filename: "remoteEntry.js",
      remotes: {
        'home': 'home@https://app-mfe-react.s3.amazonaws.com/home/remoteEntry.js',
        'settings': 'settings@https://app-mfe-react.s3.amazonaws.com/settings/remoteEntry.js',
        'users': 'users@https://app-mfe-react.s3.amazonaws.com/users/remoteEntry.js',
        'data': 'data@https://app-mfe-react.s3.amazonaws.com/data/remoteEntry.js'
      },
      exposes: {
        './SettingsList': './src/Settings/SettingsList.tsx',
        './SettingsService': './src/Settings/Settings.service.tsx'
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
