import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React — always first
            ['^react$', '^react-dom$', '^react/'],
            // Next.js
            ['^next', '^@next'],
            // Other packages from node_modules
            ['^@?\\w'],
            // Internal aliases (@/...)
            ['^@/'],
            // Relative imports
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  prettierPlugin,
]

export default eslintConfig
