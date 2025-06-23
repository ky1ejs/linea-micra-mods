import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astroeslint from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.astro/',
      'public/',
      '.env*',
      '*.config.*',
      '.vercel/',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ...js.configs.recommended,
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        HTMLElement: 'readonly',
      },
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
    },
  },
  {
    files: ['scripts/**/*.js'],
    rules: {
      'no-console': 'off', // Allow console in build scripts
    },
  },
  ...astroeslint.configs.recommended,
];