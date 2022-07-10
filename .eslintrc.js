module.exports = {
  root: true,
  extends: [
    'standard-react-ts'
  ],
  globals: {
    __isBrowser__: 'readonly'
  },
  rules: {
    'comma-dangle': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
}
