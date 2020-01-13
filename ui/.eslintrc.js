module.exports = {
  extends: [
    'react-app', // Part of react-scripts (create-react-app)
    'standard',
    'standard-react',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'jest',
    'prettier',
  ],
  
  rules: {
    'prettier/prettier': ['error', {
      tabWidth: 2,
      useTabs: false,
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      arrowParens: 'always'
    }],
    
    'react/no-unsafe': 'warn',
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['any']
      }
    ],
    
    'no-console': [
      'warn',
      {
        allow: [
          'error',
          'warn'
        ]
      }
    ],
    
    "jest/consistent-test-it": [
      "error",
      {
        "fn": "it",
        "withinDescribe": "it"
      }
    ],
    "jest/expect-expect": [
      "error",
      {
        "assertFunctionNames": [
          "expect"
        ]
      }
    ],
    "jest/no-jasmine-globals": "error",
    "jest/no-test-callback": "error",
    "jest/prefer-to-be-null": "error",
    "jest/prefer-to-be-undefined": "error",
    "jest/prefer-to-contain": "error",
    "jest/prefer-to-have-length": "error",
    "jest/valid-describe": "error",
    "jest/valid-expect-in-promise": "error"
  },
}
