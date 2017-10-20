module.exports = {
  "extends": require.resolve("baqend-coding-standard/eslint"),
  "rules": {
    "semi": [2, "never"],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
  },
  "env": {
    "jest": true
  }
};
