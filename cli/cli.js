#!/usr/bin/env node

import program from 'commander'
import generate from '../src/index'

let result;

program._name = 'baqend';

program
  .version('0.0.1')

program
  .description('Upload and download your schema')
  .option('--file <file>', 'Schema JSON')
  .option('--app <app>', 'Baqend app name')
  .option('-S, --schema', 'generates the schema only')
  .option('-D, --dest <dir>', 'The destination for the server', 'server')
  .option('--silent', 'No logs')
  .parse(process.argv);

generate({
  file: program.file,
  app: program.app,
  schema: program.schema,
  dest: program.dest
})
