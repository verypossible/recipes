import config from '../index'

const paths = config.utils_paths

export default {
  compress: true,
  contentBase: [paths.src(), paths.public()],
  port: config.server_port,
  historyApiFallback: true,
  hot: true,
  https: false,
  noInfo: false,
  overlay: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
