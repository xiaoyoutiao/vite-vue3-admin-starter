/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/** @type { import("eslint").ESLint.ConfigData } */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ["index", 'Home', 'default', '[...all]']
      }
    ]
  }
}
