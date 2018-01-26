import config from '../index'

const paths = config.utils_paths

export default [
  {
    exclude: paths.base('node_modules'),
    include: paths.src(),
    test: /\.tsx?$/,
    use: [
      {
        loader: 'react-hot-loader/webpack'
      },
      {
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  {
    enforce: 'pre',
    exclude: /node_modules/,
    loader: 'source-map-loader',
    test: /\.js$/
  },
  {
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
    test: /\.(graphql|gql)$/
  },
  {
    loader: 'url-loader',
    query: {
      limit: 10000,
      mimetype: 'application/font-woff',
      name: '[path][name].[ext]',
      prefix: 'fonts/'
    },
    test: /\.woff$/
  },
  {
    loader: 'url-loader',
    query: {
      limit: 10000,
      mimetype: 'application/font-woff2',
      name: '[path][name].[ext]',
      prefix: 'fonts/'
    },
    test: /\.woff2$/
  },
  {
    loader: 'file-loader',
    query: {
      limit: 10000,
      mimetype: 'font/opentype',
      name: '[path][name].[ext]',
      prefix: 'fonts/'
    },
    test: /\.otf$/
  },
  {
    loader: 'url-loader',
    query: {
      limit: 10000,
      mimetype: 'application/octet-stream',
      name: '[path][name].[ext]',
      prefix: 'fonts/'
    },
    test: /\.ttf$/
  },
  {
    loader: 'file-loader',
    query: {
      name: '[path][name].[ext]',
      prefix: 'fonts/'
    },
    test: /\.eot$/
  },
  {
    exclude: /node_modules/,
    loader: 'svg-react-loader',
    query: {
      propsMap: {
        fillRule: 'fill-rule'
      },
      xmlnsTest: /^xmlns.*$/
    },
    test: /\.svg$/
  },
  {
    loader: 'url-loader',
    query: {
      limit: 8192
    },
    test: /\.(png|jpg|jpeg)$/
  }
]
