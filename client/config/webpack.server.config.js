const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssNormalize = require("postcss-normalize");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const nodeExternals = require("webpack-node-externals");

const getClientEnvironment = require("./env");
const paths = require("./paths");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
// In development, we always serve from the root. This makes config easier.
const publicPath = paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

module.exports = function() {
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve("postcss-loader"),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            require("postcss-preset-env")({
              autoprefixer: {
                flexbox: "no-2009"
              },
              stage: 3
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize()
          ],
          sourceMap: false
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve("resolve-url-loader"),
          options: {
            sourceMap: false
          }
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true
          }
        }
      );
    }
    return loaders;
  };

  return {
    entry: paths.appServerIndexJs,
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: 10000,
                name: "/static/media/[name].[hash:8].[ext]"
              }
            },
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: false
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true
            },
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                getLocalIdent: getCSSModuleLocalIdent,
                importLoaders: 1,
                modules: true,
                sourceMap: false
              })
            },
            // In production, assets are copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "/static/media/[name].[hash:8].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        chunkFilename: "/static/css/[name].[contenthash:8].chunk.css",
        filename: "/static/css/[name].[contenthash:8].css"
      }),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // In production, it will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      // In development, this will be an empty string.
      new webpack.DefinePlugin(env.stringified)
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      __dirname: false,
      child_process: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      module: "empty",
      net: "empty",
      tls: "empty"
    },
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, paths.appBuild)
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    target: "node"
  };
};
