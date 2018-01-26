import _debug from 'debug'

import config from '../index'

import entry from './entry'
import renderHtml from './html'
import plugins from './plugins'
import resolve from './resolve'
import rules from './rules'
import server from './server'

const paths = config.utils_paths
const ENV = config.env
const isDev = ENV !== 'production'

const debug = _debug('app:webpack:config')
debug(`Loading webpack configuration for ${ENV}`)

export default {
  context: paths.src(),
  devServer: (isDev && server) || false,
  devtool: 'source-map',
  entry: entry[ENV],
  module: {
    rules
  },
  output: {
    chunkFilename: `[name].[hash].js`,
    filename: `[name].[hash].js`,
    path: paths.build(),
    publicPath: (isDev && config.devUrl) || '/'
  },
  plugins: plugins.base.concat(plugins[ENV]),
  resolve,
  target: 'web'
}
