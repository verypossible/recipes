const config = require('../config')

const moduleNameMaps = {
  '^.+\\.(css|md|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
    '<rootDir>/test/__mocks__/fileMock.js'
}

const jestConfig = {
  transform: {
    '\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js',
    '\\.(gql|graphql)$': './test/config/transformGraphQL.js'
  },
  globals: config.globals,
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    'md',
    'graphql',
    'gql',
    'yml'
  ],
  moduleDirectories: ['node_modules', 'src'],
  bail: true,
  testURL: config.devUrl,
  verbose: true,
  collectCoverageFrom: ['**/src/**'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '^.*(d.ts?)',
    '^.*(gql|md|json?)',
    '/docs/'
  ],
  moduleNameMapper: moduleNameMaps,
  testPathIgnorePatterns: [
    '/blueprints/.*|\\.md$',
    '(\\stories.tsx?)',
    '/extracted/'
  ],
  setupFiles: [
    './test/config/requestAnimationPolyfill.js',
    './test/config/enzyme.js',
    './test/__mocks__/bluetooth.js'
  ],
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js'
}

if (process.env.COVERAGE) {
  jestConfig.collectCoverage = true
}

if (process.env.TEST_SPECS && !process.env.TEST_FEATURES) {
  jestConfig.testRegex = '(/__tests__/.*|\\.(spec))\\.(ts|tsx|js)$'
}

if (process.env.TEST_FEATURES && !process.env.TEST_SPECS) {
  jestConfig.testRegex = '(/__tests__/.*|\\.(feature))\\.(ts|tsx|js)$'
}

if (process.env.TEST_FEATURES && process.env.TEST_SPECS) {
  jestConfig.testRegex = '(/__tests__/.*|\\.(feature|spec))\\.(ts|tsx|js)$'
}

module.exports = jestConfig
