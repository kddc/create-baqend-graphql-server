import { codeBlock } from 'common-tags'
import util from 'util'
import path from 'path'

const jsonPath = path.join(process.cwd(), './test/schema.json')
const distPath = path.join(process.cwd(), './dist/graphql.js')

import IOService from './services/IOService'
import Schema from './schema/Schema'
import Bundler from './codegen/Bundler'

import { generateLoader } from './codegen/loader'
import { generateResolvers } from './codegen/resolvers'
import { generateTypes } from './codegen/types'
import { generateBundle } from './codegen/bundle'

const deleteImports = (input) => {
  return input.replace(/^(import|export).*\n?/gm, '')
}

const start = async () => {
  let json = await IOService.readFile(jsonPath)
  let schema = new Schema(json)

  let base64 = await IOService.readFile(path.join(process.cwd(), './src/util/base64.js'))
  let parseFilterInput = await IOService.readFile(path.join(process.cwd(), './src/util/parseFilterInput.js'))
  let parseSortByInput = await IOService.readFile(path.join(process.cwd(), './src/util/parseSortByInput.js'))
  let baqendResolver = await IOService.readFile(path.join(process.cwd(), './src/util/BaqendResolver.js'))

  let loaderDefs = schema.getLoaderDefs()
  let typeDefs = schema.getTypeDefs()
  let resolverDefs = schema.getResolverDefs()

  let loader = generateLoader({}, loaderDefs)
  let types = generateTypes({}, typeDefs)
  let resolvers = generateResolvers({}, resolverDefs)

  let defs = [
    base64,
    parseFilterInput,
    parseSortByInput,
    baqendResolver,
    loader,
    types,
    resolvers
  ].map(def => {
    return deleteImports(def)
  })

  let bundle = generateBundle({}, { defs })

  IOService.writeFile(bundle, distPath)
}

start()
