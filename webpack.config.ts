// const StylelintPlugin = require("stylelint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const keys = require("./apiKeys");
const curEnv = keys.config.curEnv;
const path = require("path");
const webpack = require("webpack");
const DIST = path.resolve(__dirname, "build/dist");
const SRC = path.resolve(__dirname, "frontend");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let devtool =  "";

if(curEnv == "development"){
  devtool = "inline-source-map";
} else {
  devtool = "source-map";
}

console.log("Current Environment: " + curEnv);

module.exports = {
    mode: curEnv,
    entry: SRC + "/index.tsx",
    devtool: devtool, //make 'source-map' for prod
    output: {
      path: DIST,
      filename: "[name].bundle.js"
    },
    resolve: {
      extensions: [ ".tsx", ".ts", ".js" ],
    },
    module: {
      rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
        },
        {
          test: /\.js$/,
          enforce: "pre",
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            emitError: true,
            emitWarning: true,
            failOnError: true,
            failOnWarning: false,
            quiet: false,
          },
        },
        {
            test: /\.(js|jsx|tsx|ts)$/,
            loader: "babel-loader",
            /*use: [{loader: "loader-loader", options:{
              workerParallelJobs: 50,
              workerNodeArgs: ['--max-old-space-size=1024'],
            }}, "babel-loader"], */
            include: [
              SRC
            ],
            exclude: /(node_modules)/,
            enforce: "pre",
            options: {
              cacheDirectory: true,
              presets: [
                "@babel/preset-react", 
                ["@babel/preset-env", {"targets": {"node": 4}}], 
                ["@babel/preset-typescript", {isTSX: true, allExtensions: true, jsxPragma: "React"}]],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            },
          },
          // { commented out because compiling with babel but checking types with typescript //https://www.youtube.com/watch?v=c9iAWw9oqK4
          //   loader: "ts-loader",
          //   options: {
          //     logLevel: "error",
          //     silent: false,
          //     logInfoToStdOut: false,
          //     configFile: "tsreactconfig.json",
          //     transpileOnly: true,
          //     happyPackMode: true,
          //   //experimentalWatchApi: true,
          //     compilerOptions:{
          //     }
          //   },
          // },
          {
            test: /\.js$/,
            use: [
              "source-map-loader"
            ], //use if having difficulty with ts
            enforce: "pre",
            // noParse: files that should not be parsed.
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: "file-loader",
              },
            ],
          },
      ],
    },
    devServer: {     
      host: "localhost",
      port: 3000, 
      proxy: {
        "!/": { //don't proxy root
          target: "http://localhost:8080/",
          ws: false,
          secure: false,
          changeOrigin: true
        },
        "/**": { //proxy everything else
          target: "http://localhost:8080/",
          ws: false,
          secure: false,
          changeOrigin: true
        }
      },
      overlay: {
        warnings: true,
        errors: true
      },
      // headers {
      //   "Access-Control-Allow-Origin", "*"
      // }
      // progress: true,
      inline: true,
      contentBase: DIST, // boolean | string | array, static file location
      clientLogLevel: "none", 
      watchOptions: { 
        ignored: ["/node_modules/", "/backend/", "/tests/"]
      },
      historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      open: true,
      liveReload: false, //is off when hot reload is on, as it causes page reloads
      https: false, // true for self-signed, object for cert authority
      index: DIST + "/index.ejs",
      quiet: false,
      noInfo: false,
      stats: {
          // assets: true,
          children: false,
          // chunks: true,
          // chunkModules: true,
          // colors: true,
          entrypoints: true,
          // hash: true,
          // modules: true,
          // timings: true,
          // version: true,
          // builtAt: true,
          errors: true,
          errorDetails: true,
          errorStack: true,
          // logging: true,
          // loggingDetails: true,
      }
    },
    optimization:{
      runtimeChunk:{
        name: "manifest"
      },
    },
    // externals: { //only use if including script in index.ejs or index.html and not bundling from node_modules into entry file
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.name': JSON.stringify('Vishwas'),
      }),

      new HtmlWebpackPlugin({
        filename: __dirname + "/build/dist/index.ejs",
        template: __dirname + "/frontend/index.ejs",
        inject: "body",
        manifest: DIST + "/manifest.bundle.js",
        title:require("./package.json").name
      }),
      new webpack.DefinePlugin({
        "global.env": JSON.stringify(process.env.NODE_ENV), //these are frontend globals
      })
    ]
};