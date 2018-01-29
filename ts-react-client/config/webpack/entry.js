import config from '../index'

const paths = config.utils_paths

const SOURCE = paths.src('index.tsx')
const HMR_PATCH = 'react-hot-loader/patch'

const vendor = [
  'react-helmet',
  'react-hot-loader',
  'react-router',
  'react',
  'styled-components'
]

const development = {
  app: [
    'babel-polyfill',
    HMR_PATCH,
    `webpack-dev-server/client?${config.server}`,
    'webpack/hot/only-dev-server',
    SOURCE
  ],
  vendor
}

const production = {
  app: [HMR_PATCH, SOURCE],
  vendor
}

export default {
  development,
  production
}
