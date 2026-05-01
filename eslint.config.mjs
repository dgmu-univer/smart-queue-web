import { defineConfig } from 'eslint/config';
import eslintPlugin from '@eslint/js';
import { configs as tseslintConfigs } from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';
import stylisticPlugin from '@stylistic/eslint-plugin';
import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  {
    name: 'project/javascript-recommended',
    files: ['**/*.{js,mjs,ts,tsx}'],
    ...eslintPlugin.configs.recommended,
  },
]);

const typescriptConfig = defineConfig([
  {
    name: 'project/typescript-strict',
    files: ['**/*.{ts,tsx,mjs}'],
    extends: [
      ...tseslintConfigs.strictTypeChecked,
      ...tseslintConfigs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    name: 'project/javascript-disable-type-check',
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslintConfigs.disableTypeChecked,
  }
]);

const reactConfig = defineConfig([
  {
    name: 'project/react-next',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      ...jsxA11yPlugin.configs.strict.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': 'off',
      'react/jsx-no-target-blank': 'off',
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
      'jsx-a11y/media-has-caption': 'warn',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Side effect imports (e.g., polyfills, global CSS)
            ['^\\u0000'],
            // 2. Framework & Libraries (React, Next.js, npm packages)
            ['^react', '^next', '^@?\\w'],
            // 3. Absolute imports / Internal Aliases (e.g., @/components)
            ['^(@|src)(/.*|$)'],
            // 4. Relative imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 5. Style imports
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
    settings: {
      react: {
        version: '19',
      },
    },
  }
]);

const stylisticConfig = defineConfig([
  {
    name: 'project/stylistic',
    files: ['**/*.{js,mjs,ts,tsx}'],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Remove legacy formatting rules from ESLint core
      ...stylisticPlugin.configs['disable-legacy'].rules,
      // Add recommended stylistic rules
      ...stylisticPlugin.configs.recommended.rules,
      // Custom style preferences
      '@stylistic/indent': ['warn', 2],
      '@stylistic/quotes': ['warn', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: 'always'
      }],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/comma-dangle': ['warn', 'only-multiline'],
      '@stylistic/arrow-parens': ['warn', 'as-needed', {
        requireForBlockBody: true
      }],
      '@stylistic/brace-style': ['warn', '1tbs', {
        allowSingleLine: true
      }],
    },
  }
]);

const ignoresConfig = defineConfig([
  {
    name: 'project/ignores',
    ignores: [
      '.next/',
      'node_modules/',
      'public/',
      '.vscode/',
      '.zed/',
      'next-env.d.ts',
    ]
  },
]);

const tailwindcssConfig = defineConfig(
  {
    name: 'custom/tailwindcss/recommended',
    files: ['**/*.ts?(x)'],
    plugins: {
      'better-tailwindcss': tailwindcssPlugin,
    },
    rules: {
      // all rules (recommended = stylistic + correctness)
      // ...tailwindcssPlugin.configs.recommended.rules,
      // stylistic rules only
      ...tailwindcssPlugin.configs.stylistic.rules,
      // correctness rules only
      // ...tailwindcssPlugin.configs.correctness.rules,
      // single customizations
      // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/README.md#rules
      // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', {
        printWidth: 200, // Maximum line length (0 = disabled)
        group: 'never', // Group separation: 'emptyLine' | 'never' | 'newLine'
        preferSingleLine: true, // Keep variants on single line until limits exceeded
      }],
    },
    settings: {
      'better-tailwindcss': {
        // tailwindcss (4) css based
        entryPoint: 'app/global.css',

        // for tailwindcss (3) with a config
        // "tailwindConfig": "tailwind.config.js"
        // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/no-unregistered-classes.md
        detectComponentClasses: true, // Enable custom class detection
      }
    },
  },
);

export default defineConfig([
  ...ignoresConfig,
  ...eslintConfig,
  ...typescriptConfig,
  ...reactConfig,
  ...tailwindcssConfig,
  ...stylisticConfig,
]);
