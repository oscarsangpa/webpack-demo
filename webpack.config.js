// Obtenemos el path del proyecto
const path = require("path");

// * PLUGINS Y MINIFICADORES de CSS / SCSS y SASS
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
/* const ESLintWebpackPlugin = require("eslint-webpack-plugin"); */

// ! ESLint loader is deprecated so it must be replaced by eslint-webpack-plugin
// TODO: fix the class constructor issue to get it working properly.
// Until that happen, Eslint code is commented to avoid errors

// Aquí configuramos el puerto en el que Webpack va a ejecutarse
// La variable PORT debería estar en los archivos .env del proyecto
// Si no, desplegará en localhost:3000
const port = process.env.PORT || 3000;

// Definimos y exportamos la CONFIGURACIÓN DE WEBPACK
module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.[hash].js",
    publicPath: "/",
  },
  context: path.resolve(__dirname),
  devServer: {
    port,
    historyApiFallback: true,
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      // Reglas para archivos JS y JSX
      // Tienen que pasar el linting para poder pasar al compilado final
      {
        enforce: "pre",
        test: /(\.js|.jsx)$/,
        exclude: /node_modules/,
        use: [
      /*       "eslint-webpack-plugin",  */
            "source-map-loader"],
      },
      // Reglas para archivos JS y JSX
      // Babel ES y JSX
      {
        test: /(\.js|.jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                modules: false,
                targets: "> 0.25%, not dead",
              },
              "@babel/react"
            ],
            plugins: ["@babel/plugin-transform-runtime"]
          },
        },
      },
      // Reglas para archivos SCCS, SASS y CSS
      // Sirve para minificarlos en un solo archivo y una línea
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", "postcss-loader",
          ],
      },
      // Reglas para los archivos de imágenes
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: { loader: "file-loader" },
      },
    ],
  },
  plugins: [

/*     new ESLintWebpackPlugin(myEslintOptions), */

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./src/styles/css/index.css",
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
