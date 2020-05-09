module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['/build/'],
  globals: {
    window: {},
  },
}
