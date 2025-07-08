module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['next/core-web-vitals', '@rocketseat/eslint-config/next'],
  rules: {
    'react/no-unescaped-entities': 'off',
  },
}
