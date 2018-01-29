import path from 'path'

import config from '../index'

const paths = config.utils_paths

export default (name, template) => ({
  favicon: paths.public('favicon.ico'),
  filename: `${name}.html`,
  minify: {
    collapseWhitespace: true
  },
  segment: {
    token: config.segment_token || false
  },
  template: paths.src(`${template || name}.html`)
})
