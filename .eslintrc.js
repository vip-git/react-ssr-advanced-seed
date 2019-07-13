module.exports = {
  extends: 'airbnb',
  "rules": {
    "no-trailing-spaces": "off",
    "import/prefer-default-export": "off",
    "react/jsx-indent": "off",
    "no-unused-vars": "off",
    "react/jsx-indent-props": "off",
    "react/prop-types": "off",
    "react/jsx-curly-brace-presence": "off",
    "react/prefer-stateless-function": "off",
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"]
    }],
    "quotes": [2, "single", {
      "avoidEscape": true
    }]
    "class-methods-use-this": "off",
    "function-paren-newline": "off",
    "jsx-quotes": ["error", "prefer-single"],
    "quote-props": ["error", "consistent"],
    "max-len": ["warn", {
      "code": 120
    }],
    "brace-style": ["error", "stroustrup"],
    "no-plusplus": "off",
    "object-curly-newline": "off",
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  "parser": "babel-eslint"
}