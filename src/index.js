import { codeBlock } from 'common-tags'
import util from 'util'
import path from 'path'

const jsonPath = path.join(process.cwd(), './test/schema.json')

const loaderPath = path.join(process.cwd(), './playground/schema/generated/loader.js')
const typesPath = path.join(process.cwd(), './playground/schema/generated/typeDefs.js')
const resolversPath = path.join(process.cwd(), './playground/schema/generated/resolvers.js')

import IOService from './services/IOService'
import Schema from './schema/Schema'
import Bundler from './codegen/Bundler'

import { generateLoader } from './codegen/loader'
import { generateResolvers } from './codegen/resolvers'
import { generateTypes } from './codegen/types'

const start = async () => {
  let json = await IOService.readFile(jsonPath)
  let schema = new Schema(json)

  let loaderDefs = schema.getLoaderDefs()
  let typeDefs = schema.getTypeDefs()
  let resolverDefs = schema.getResolverDefs()

  let loader = generateLoader({}, loaderDefs)
  let types = generateTypes({}, typeDefs)
  let resolvers = generateResolvers({}, resolverDefs)

  IOService.writeFile(loader, loaderPath)
  IOService.writeFile(types, typesPath)
  IOService.writeFile(resolvers, resolversPath)
}

start()
