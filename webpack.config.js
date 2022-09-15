const path = require('path');

// CSS/SASS PLUGINS

const HtmlWebpackPlugin = require("html-webpack-plugin"); // para el template del HTML que usará webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // para reducir los CSS
const { SourceMapDevToolPlugin } = require("webpack"); // para conocer el Source Map de nuestro proyecto

// port config

const port = process.env.PORT || 3000;

// export config Webpack

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  context: path.resolve(__dirname),
  devServer: {
    port,
    inline: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      // file JS and JSX rules
      // pass LINTING to success
      {
        enforce: 'pre',
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        use: ["eslint-loader", "source-map-loader"],
      },
      // Babel files JS & JSX rules
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/env", "@babel/react"],
        },
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // Template HTML
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/styles.css",
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss", ".sass"],
    modules: ["node_modules"],
  },
};
