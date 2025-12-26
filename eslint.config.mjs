import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import jsdoc from 'eslint-plugin-jsdoc'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      'jsdoc/require-description': 'error',
      'jsdoc/check-values': 'error',
    },
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'no-console': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'prefer-const': [
        'error',
        {
          ignoreReadBeforeAssign: true,
        },
      ],
    },
  },
  {
    ignores: ['.node_modules/*'],
  },
]
