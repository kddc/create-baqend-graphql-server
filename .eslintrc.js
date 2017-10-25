module.exports = {
  "extends": require.resolve("baqend-coding-standard/eslint"),
  "rules": {
    "semi": [2, "never"],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "arrow-body-style": [1, "as-needed"]
  },
  "env": {
    "jest": true
  }
};
