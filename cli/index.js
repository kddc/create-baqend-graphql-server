#!/usr/bin/env node
require('babel-register')({
  "presets": [["env", {
    "targets": {
      "node": "8"
    }
  }]],
  "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]
});
require('./cli.js');
