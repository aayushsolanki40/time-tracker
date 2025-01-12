module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier', // Ensure this is the last item
  ],
  rules: {
    '@typescript-eslint/quotes': ['error', 'single'], // Enforce single quotes for TypeScript
    quotes: ['error', 'single'], // Enforce single quotes for JavaScript
    'no-unused-vars': 'error', // Error for unused variables
    '@typescript-eslint/no-unused-vars': 'error', // Error for unused variables in TypeScript
    'no-unused-imports': 'error', // Error for unused imports
  },
}
