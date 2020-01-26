module.exports = {
  extends: 'erb/typescript',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/interface-name-prefix': [
      'error',
      {
        prefixWithI: 'always'
      }
    ]
  },
  settings: {
    polyfills: [
      // Example of marking entire API and all methods and properties as polyfilled
      'Promise',
      // Example of API with no property (i.e. a function)
      'fetch'
    ],
    'import/resolver': {
      // alias: {
      //   map: [
      //     ['@app', './app'][('@routes', './app/Routes.tsx')],
      //     ["@theme", "./app/assets/ts/theme.tsx"],
      //     ['@assets', './app/assets'],
      //     ['@css', './app/assets/css'],
      //     ['@images', './app/assets/images'],
      //     ['@tsStyles', './app/assets/tsStyles'],
      //     ['@components', './app/components'],
      //     ['@constants', './app/constants'],
      //     ['@containers', './app/containers'],
      //     ['@state', './app/state'],
      //     ['@ducks', './app/state/ducks'],
      //     ['@middlewares', './app/state/middlewares'],
      //     ['@stateUtils', './app/state/utils'],
      //     ['@views', './app/views'],
      //     ['@utils', './app/utils'],
      //     ['@resources', './resources'],
      //     ['@gitlab', './app/gitlab'],
      //     ['@private', './app/private']
      //   ],
      //   extensions: ['.ts', '.js', '.tsx', '.json']
      // },
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
};
