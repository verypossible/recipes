const string = value => JSON.stringify(value)

export const merge = (base, additions) => Object.assign(base, additions)

export default {
  development: config => ({
    // Override config keys for development
    // config_key: 'foo',
    globals: merge(config.globals, {
      __ROLLBAR_ENABLED__: false,
      __ROLLBAR_TOKEN__: string(config.rollbar_client)
    })
  }),

  production: config => ({
    // Override config keys for production
    // config_key: 'bar',
    globals: merge(config.globals, {
      __ROLLBAR_ENABLED__: true,
      __ROLLBAR_TOKEN__: string(config.rollbar_client)
    })
  }),

  // Test overrides
  test: config => ({
    globals: merge(config.globals, {
      __ROLLBAR_ENABLED__: false,
      __ROLLBAR_TOKEN__: false
    })
  })
}
