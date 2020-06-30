/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const NotifierPlugin = require('webpack-notifier');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    app: path.resolve(__dirname, './src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      react: require.resolve('react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              template: (
                { template },
                opts,
                { imports, componentName, props, jsx, exports }
              ) => template.ast`
              ${imports} 
              
              const ${componentName} = (${props}) => {
                props = {...props, width:'512', height:'512', viewBox:'0 0 512 512'};
                return ${jsx};
          };
          export default ${componentName}`,
            },
          },
          // 'url-loader',
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './build/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  devServer: {
    contentBase: './build',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};

module.exports = (env, argument) => {
  const currentPath = path.join(__dirname);
  const basePath = `${currentPath}/.env`;
  const envPath = `${basePath}.${argument.mode}`;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  if (argument.mode === 'development') {
    config.devtool = 'cheap-module-eval-source-map';
    config.plugins.push(
      new NotifierPlugin({
        title: 'WeatherPlz',
        alwaysNotify: true,
      })
    );
  }

  // config.plugins.push(
  //   new webpack.DefinePlugin({
  //     _mode: JSON.stringify(argument.mode),
  //     __ENVIRONMENT__: JSON.stringify(process.env.NODE_ENV),
  //   })
  // );
  config.plugins.push(new webpack.DefinePlugin(envKeys));

  return config;
};
