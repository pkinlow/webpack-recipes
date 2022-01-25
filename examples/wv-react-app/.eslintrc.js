module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true,
      "jest": true
  },
  // Add Global Variable exceptions
  "globals": {
    "window": true,
    "console": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"

  ],
  "parserOptions": {
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "parser": "@babel/eslint-parser",
  // Toggle Eslint Rules
  "rules": {
      // React Rules
      "react/prop-types": 0,
      "no-sparse-arrays": 0,
      // General Rules
      "no-console": 0,
      "no-unused-vars": 0,
      "no-case-declarations": 0,
      "linebreak-style": [
          "error",
          "unix"
      ],
      "semi": [
          "error",
          "always"
      ]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};