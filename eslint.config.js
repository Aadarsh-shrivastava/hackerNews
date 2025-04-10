import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import react from "eslint-plugin-react"

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettierPlugin,
      'sort-keys-fix': sortKeysFix,
      'react': react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-console': ['warn'],
      "sort-keys": ["error", "asc", { "caseSensitive": true, "natural": false, "minKeys": 2 }],
      'sort-keys-fix/sort-keys-fix': 'error',
      "unused-imports/no-unused-imports": "warn",
      "react/jsx-sort-props": [
        "error",
        {
          "callbacksLast": true, // Place callbacks at the end
          "shorthandFirst": true, // Place shorthand props first
          "ignoreCase": true, // Ignore case when sorting
          "noSortAlphabetically": false // Sort alphabetically
        }
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": [
            "public-static-field",
            "public-instance-field",
            "protected-static-field",
            "protected-instance-field",
            "private-static-field",
            "private-instance-field",
            "constructor",
            "public-static-method",
            "public-instance-method",
            "protected-static-method",
            "protected-instance-method",
            "private-static-method",
            "private-instance-method"
          ]
        }
      ]
    },
  },
)