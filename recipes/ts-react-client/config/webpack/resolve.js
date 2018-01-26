import config from '../index'

const paths = config.utils_paths

export default {
  extensions: [
    '.js',
    '.jsx',
    '.json',
    '.css',
    '.ts',
    '.tsx',
    '.graphql',
    '.gql',
    '.md'
  ],
  modules: [paths.src(), 'node_modules']
}
