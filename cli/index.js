#!/usr/bin/env node
require('babel-register')({
  "presets": ["es2015"],
  "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]
});
require('./cli.js');
