module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'standard-react',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'jsx-a11y',
    'jest',
  ],
  env: {
    browser: true,
    jest: true
  },
  
  rules: {
    'prettier/prettier': ['error', {
      tabWidth: 2,
      useTabs: false,
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      arrowParens: 'always'
    }],
    
    // TEMPORARY RULES ---
    
    '@typescript-eslint/no-explicit-any': ['warn', {
      // fixToUnknown: true,
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    
    // CUSTOM RULES ---
    
    'react/no-unsafe': 'warn',
    
    'no-console': [
      'warn',
      {
        allow: [
          'error',
          'warn'
        ]
      }
    ],
    
    // TODO:
    // "jest/consistent-test-it": [
    //   "error",
    //   {
    //     "fn": "it",
    //     "withinDescribe": "it"
    //   }
    // ],
    // "jest/expect-expect": [
    //   "error",
    //   {
    //     "assertFunctionNames": [
    //       "expect"
    //     ]
    //   }
    // ],
    // "jest/no-jasmine-globals": "error",
    // "jest/no-test-callback": "error",
    // "jest/prefer-to-be-null": "error",
    // "jest/prefer-to-be-undefined": "error",
    // "jest/prefer-to-contain": "error",
    // "jest/prefer-to-have-length": "error",
    // "jest/valid-describe": "error",
    // "jest/valid-expect-in-promise": "error"
  },
}
