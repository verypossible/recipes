import path from 'path'

import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import GitRevisionPlugin from 'git-revision-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin'
import RollbarSourceMapPlugin from 'rollbar-sourcemap-webpack-plugin'
import * as webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import WebpackMd5Hash from 'webpack-md5-hash'

import { merge } from '../environments'
import config from '../index'

import html from './html'

const paths = config.utils_paths
const gitRevisionPlugin = new GitRevisionPlugin()
const commitHash = JSON.stringify(gitRevisionPlugin.commithash())

const base = [
  gitRevisionPlugin,
  new WebpackMd5Hash(),
  new ManifestPlugin(),
  new webpack.NamedModulesPlugin(),
  new TsConfigPathsPlugin({
    compiler: 'typescript',
    tsconfig: paths.base('tsconfig.json')
  }),
  new CheckerPlugin(),
  new InlineManifestWebpackPlugin({
    name: 'webpackManifest'
  }),
  new webpack.DefinePlugin(
    merge(config.globals, {
      __COMMIT_HASH__: commitHash
    })
  ),
  new HtmlWebpackPlugin(html('index')),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    minChunks: Infinity,
    names: ['vendor', 'manifest']
  }),
  new CompressionPlugin({
    algorithm: 'gzip',
    asset: '[path].gz[query]',
    minRatio: 0.8,
    test: /\.js$|\.css$|\.png$|\.jpg$|\.md$|\.html$/,
    threshold: 10240
  }),
  new webpack.optimize.AggressiveMergingPlugin()
]

const development = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HardSourceWebpackPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),
  new BrowserSyncPlugin(
    {
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
      },
      host: config.server_host,
      open: config.browser_sync_open_window,
      port: config.browser_sync_port,
      proxy: `${config.server_host}:${config.server_port}`,
      ui: {
        port: config.browser_sync_ui_port
      }
    },
    {
      reload: false
    }
  )
]

const production = [
  new CopyWebpackPlugin([{ from: paths.public() }]),
  new webpack.optimize.UglifyJsPlugin({
    comments: true,
    compress: {
      dead_code: true,
      unused: true,
      warnings: false
    },
    sourceMap: true
  }),
  new webpack.IgnorePlugin(/^\.(feature|spec|stories)\\.(ts|tsx|js)$/),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.LoaderOptionsPlugin({
    debug: false
  })
]

export default {
  base,
  development,
  production
}
