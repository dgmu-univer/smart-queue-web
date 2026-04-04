import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, prettierPlugin]

export default eslintConfig
