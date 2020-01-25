/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from '../app/package.json';

function getAppPath() {
  return path.join(__dirname, '..', 'app');
}

function getAppFoldersPath(folder) {
  return path.join(getAppPath(), folder);
}

function getSrcPath() {
  return path.join(__dirname, '..');
}

function getSrcFoldersPath(folder) {
  return path.join(getSrcPath(), folder);
}

export default {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: getAppPath(),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    alias: {
      '@app': getAppPath(),
      '@routes': getAppFoldersPath('./Routes.tsx'),
      '@theme': getAppFoldersPath('./assets/ts/theme.tsx'),
      '@assets': getAppFoldersPath('assets'),
      '@css': getAppFoldersPath('assets/css'),
      '@images': getAppFoldersPath('assets/images'),
      '@tsStyles': getAppFoldersPath('assets/tsStyles'),
      '@actions': getAppFoldersPath('actions'),
      '@components': getAppFoldersPath('components'),
      '@constants': getAppFoldersPath('constants'),
      '@containers': getAppFoldersPath('containers'),
      '@reducers': getAppFoldersPath('reducers'),
      '@store': getAppFoldersPath('store'),
      '@state': getAppFoldersPath('state'),
      '@ducks': getAppFoldersPath('state/ducks'),
      '@middlewares': getAppFoldersPath('state/middlewares'),
      '@stateUtils': getAppFoldersPath('state/utils'),
      '@views': getAppFoldersPath('views'),
      '@utils': getAppFoldersPath('utils'),
      '@resources': getSrcFoldersPath('resources'),
      '@gitlab': getAppFoldersPath('gitlab'),
      '@private': getAppFoldersPath('private')
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [getAppPath(), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin()
  ]
};
