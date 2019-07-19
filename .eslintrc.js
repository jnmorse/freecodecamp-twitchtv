module.exports = {
  env: {
    browser: true
  },

  parserOptions: {
    ecmaVersion: 8
  },

  parser: 'babel-eslint',

  extends: 'jnmorse',

  globals: {
    $: true,
    jQuery: true
  },

  rules: {
    'react/static-property-placement': ['error', 'static public field'],
    'import/prefer-default-export': 0,
    'react/destructuring-assignment': 0,
    'import/exports-last': 0
  }
};
