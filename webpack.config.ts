const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const webpack = require('webpack');
import webpack from 'webpack'
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 值域：develop staging production stress
const apiEnv=process.env['API_ENV']||'develop';

// 值域：development production
const nodeEnv=process.env['NODE_ENV']==='development'?'development':'production';

const devMode=nodeEnv==='development'

const getPlugins=()=>{
  const plugins=[
    new HtmlWebpackPlugin({
      // filename:'./index.html',
      template:'./demo/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:JSON.stringify(nodeEnv),
        API_ENV: JSON.stringify(apiEnv)
      }
    })
  ];

  if(nodeEnv==='development'){
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new ForkTsCheckerWebpackPlugin()
    )
  }else if(nodeEnv==='production'){
    plugins.push(
      new CleanWebpackPlugin(['build'])
    );

    plugins.push( new MiniCssExtractPlugin({
      filename: '[name]style.css'
  })
  );

  }

  return plugins;
}



const config:webpack.Configuration = {
  entry: {
    index: './src/index.tsx',
    demo:'./demo/index.tsx'
  },
  output: {
    // path: resolve('dist'),//config.build.assetsRoot, // 编译输出的静态资源根路径
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js",
    publicPath: '/',
  },
  mode: nodeEnv,
  devtool:devMode?'source-map':false,
  resolve: {
    extensions: ['.tsx', '.ts','.js', '.jsx', '.json'], // 自动补全的扩展名
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    publicPath: "/",
    historyApiFallback: true,
    hot:true,
    disableHostCheck: true,
    port: 9999,
    host: '0.0.0.0'
  },
  module: {
    rules: [
       ...[
        {
          test: /\.css$/,
          use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader'
          ]
      },
      {
        test: /\.(j|t)sx?$/,
        use:{
          loader: "babel-loader",
          options:{
            cacheDirectory: true,
          }
        }
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4096, // 4kb 以下base64 url打包
          }
        }

      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader'
      },
    ]]
  },
  plugins: getPlugins()
}

export default config;
