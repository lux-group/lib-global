const environment = {
  DEVELOPMENT: 'development',
  SPEC: 'spec',
  TEST: 'test',
  PRODUCTION: 'production',
  PERFORMANCE: 'performance',
}

module.exports = {
  ...environment,
  // @deprecated kept for backward compability, not supported by index.d.ts
  environment,
}
