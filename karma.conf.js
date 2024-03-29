var _ = require('lodash');
var convertToKarmaWebpack = function(config) {
  return _.assign({}, config, {
    devtool: 'inline-source-map',
    entry: {},
    output: {},
    module: _.assign({}, config.module, {
      loaders: [
        {
          loader: 'babel-loader',
          test: /\.(js)$/
        },
        {
          test: /\.(js)$/,
          exclude: /(test|node_modules)\//,
          loader: 'istanbul-instrumenter'
        }
      ]
    })
  });
};
var webpackConfig = convertToKarmaWebpack(require('./webpack.conf.js'));

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      '/lib/**/*.js',
      'test/**/*.test.js'
    ],
    preprocessors: {
      '/lib/**/*.js': ['webpack'],
      'test/**/*.js': ['webpack']
    },
    plugins: ['karma-*'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
