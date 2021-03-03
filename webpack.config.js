const path = require("path");
const isProductionMode =
  process.argv[process.argv.indexOf("--mode") + 1] === "production";
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: isProductionMode ? "production" : "development",

  devtool: isProductionMode ? false : "inline-source-map",

  target: isProductionMode ? "browserslist" : "web",

  context: path.resolve(__dirname, "src"),

  entry: {
    index: "./index.js",
  },

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },

  plugins: [
    new ESLintPlugin(),
    new HTMLWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src", "images"),
    //       to: "./images/", //[name].[contenthash].[ext]
    //     },
    //   ],
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      //for css import in html
      // {
      //   test: /\.css$/i,
      //   use: [
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         sourceMap: true,
      //         postcssOptions: {
      //           plugins: [
      //             [
      //               "autoprefixer",
      //               {
      //                 // Options
      //               },
      //             ],
      //             "postcss-import",
      //           ],
      //         },
      //       },
      //     },
      //   ],
      //   generator: {
      //     filename: "styles/[name].[contenthash].css",
      //   },
      // },

      // for css import in js
      {
        test: /\.css$/i,
        use: [
          isProductionMode
            ? MiniCssExtractPlugin.loader
            : {
                loader: "style-loader",
                options: {},
              },
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: isProductionMode
            ? "images/[name].[contenthash][ext]"
            : "images/[name][ext]",
        },
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
    ],
  },

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },

  devServer: {
    watchContentBase: true,
    contentBase: path.join(__dirname, "src"),
    open: true,
    hot: true,
    compress: true,
  },
};
