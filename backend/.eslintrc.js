module.exports = {
  env: {
    node: true,
    es2021: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint', 'prettier'],

  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],

  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
};
