// @ts-nocheck

import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
  {
    ignores: [
      'dist/*',
      // Temporary compiled files
      '**/*.ts.build-*.mjs',

      // JS files at the root of the project
      '*.js',
      '*.cjs',
      '*.mjs',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        1,
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },

  ...pluginVue.configs['flat/recommended'],

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // common
      semi: ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'no-unused-vars': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': [2, { before: false, after: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\0'],
            ['^[a-z]', '^[A-Z]'],
            ['^@', '^\\w'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      // vue
      'vue/no-setup-props-destructure': 'off',
      'vue/no-dupe-keys': 'off',
      'vue/attributes-order': [
        'error',
        {
          order: [
            'ATTR_SHORTHAND_BOOL',
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'ATTR_STATIC',
            'ATTR_DYNAMIC',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: true,
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      // prettier
      'prettier/prettier': ['error', { singleQuote: true }],
      // typescript
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      // other
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },

  prettier,
);
