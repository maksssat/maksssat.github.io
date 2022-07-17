const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),

  entry: {
    index: "./index.js",
  },

  plugins: [
    new ESLintPlugin(),
    new HTMLWebpackPlugin({
      template: "./index.html",
      inject: "body",
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

      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[contenthash][ext]",
        },
      },
    ],
  },

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

//   for css import in html

/* {
  test: /\.html$/i,
  loader: "html-loader",
},



{
  test: /\.css$/i,
  use: [
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
            "postcss-import",
          ],
        },
      },
    },
  ],
  generator: {
    filename: "styles/[name].[contenthash].css",
  },
}, */
