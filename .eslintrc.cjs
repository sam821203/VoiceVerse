/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    node: true
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  // extends: ['plugin:vue/recommended', 'airbnb-base'],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'comma-dangle': ['error', 'always']
    "vue/max-attributes-per-line": [
      "error",
      {
        "singleline": {
          "max": 3
        }
      }
    ],
  },
  fix: true // 啟用自動修復
}
