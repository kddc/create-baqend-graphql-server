import util from 'util'
import path from 'path'
const jsonPath = path.join(process.cwd(), './test/schema.json')
const outputFile = path.join(process.cwd(), './dist/graphql.js')

import IOService from './services/IOService'
import Schema from './schema/Schema'
import Bundler from './codegen/Bundler'

const start = async () => {
  let json = await IOService.readFile(jsonPath)
  let schema = new Schema(json)
  let bundler = new Bundler(schema)
  bundler.render(outputFile)
}

start()
