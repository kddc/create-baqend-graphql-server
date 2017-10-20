#!/usr/bin/env node

import program from 'commander'
import generate from '../src/index'

let result;

program._name = 'baqend';

program
  .version('0.0.1')

program
  .description('Upload and download your schema')
  .option('--app <app>', 'Baqend app name')
  .option('-S, --schema', 'generates the schema only')
  .option('-D, --dest <dir>', 'The destination for the server', 'server')
  .parse(process.argv);

generate({
  app: program.app,
  schema: program.schema,
  dest: program.dest
})
