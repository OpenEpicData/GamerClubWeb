module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "plugin:vue/essential",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "parser": "babel-eslint",
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "space-before-function-paren": [
      "error",
      "always"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ]
  },
  globals: {}
}
