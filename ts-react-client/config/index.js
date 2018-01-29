import * as path from 'path'
import _debug from 'debug'
import { argv } from 'yargs'

import environments from './environments'

const debug = _debug('app:config')
debug('Creating default configuration.')

const basePath = path.resolve(__dirname, '..')
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  app_name: 'ts-react-client',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: basePath,
  dir_src: path.join(basePath, 'src'),
  dir_build: path.join(basePath, 'build'),
  dir_public: path.join(basePath, 'public'),
  dir_test: path.join(basePath, 'test'),

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_protocol: process.env.PROTOCOL || 'http',
  server_host: process.env.HOST || 'localhost',
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // BrowserSync Options
  // ----------------------------------
  browser_sync_port: 3010,
  browser_sync_ui_port: 3011,
  browser_sync_open_window: false,

  // ----------------------------------
  // Rollbar Tokens
  // ----------------------------------
  rollbar_client: '',
  rollbar_server: '',

  // ----------------------------------
  // Analytics
  // ----------------------------------
  segment_dev: '',
  segment_prod: '',

  // ----------------------------------
  // Graphql
  // ----------------------------------
  graphql_server: ''
}

// ------------------------------------
// Environment
// ------------------------------------
config.server = `${config.server_protocol}://${config.server_host}:${
  config.server_port
}`

config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env)
  },
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test',
  __DEBUG__: config.env === 'development' && !argv.no_debug,
  __COVERAGE__: !argv.watch && config.env === 'test',
  __PROTOCOL__: config.server_protocol,
  __HOST__: config.server_host,
  __PORT__: config.server_port,
  __GRAPHQL_API__: JSON.stringify(config.graphql_server)
}

// ------------------------------------
// Utilities
// ------------------------------------
function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.utils_paths = {
  base: base,
  src: base.bind(null, config.dir_src),
  build: base.bind(null, config.dir_build),
  public: base.bind(null, config.dir_public),
  test: base.bind(null, config.dir_test)
}

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

export default config
