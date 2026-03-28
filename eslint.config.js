import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      react: { version: 'detect' },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },

    rules: {
      // ✅ Base rules
      ...js.configs.recommended.rules,

      // ✅ React rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // ✅ React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // 🔥 Custom rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',

      // ✅ Prettier rule
      'prettier/prettier': 'error',

      // 🔥 Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // 🔥 Style rules (optional now, Prettier handles this)
      semi: ['error', 'always'],
      quotes: ['error', 'single'],

      // 🔥 React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // ✅ VERY IMPORTANT (must be last)
  prettier,
]);
