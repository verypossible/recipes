require('babel-polyfill')
require('babel-register')
const webpackConfig = require('./config/webpack/webpack.config').default

module.exports = function() {
  return webpackConfig
}
