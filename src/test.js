import { codeBlock } from 'common-tags'
import fetch from 'node-fetch'
import util from 'util'
import path from 'path'

// const jsonPath = 'test/schema.json'
// const distPath = path.join(process.cwd(), './dist/graphql.js')

import IOService from './services/IOServiceSync'
import Schema from './schema/Schema'
import { generateLoader } from './codegen/loader'
import { generateResolvers } from './codegen/resolvers'
import { generateTypes } from './codegen/types'
// import { generateBundle } from './codegen/bundle'

const deleteImports = (input) => {
  return input.replace(/^(import|export).*\n?/gm, '')
}

const start = async () => {
  if(!IOService.fileExists('server')) IOService.mkDir('server')
  if(!IOService.fileExists('server/util')) IOService.mkDir('server/util')
  if(!IOService.fileExists('server/schema')) IOService.mkDir('server/schema')
  if(!IOService.fileExists('server/codegen')) IOService.mkDir('server/codegen')
  if(!IOService.fileExists('server/schema/generated')) IOService.mkDir('server/schema/generated')
  if(!IOService.fileExists('server/schema/baqend')) IOService.mkDir('server/schema/baqend')
  if(!IOService.fileExists('server/schema/custom')) IOService.mkDir('server/schema/custom')

  IOService.copyFile('src/server/index.js', 'server/index.js')
  IOService.copyFile('src/server/bundle.js', 'server/bundle.js')
  IOService.copyFile('src/server/package.json', 'server/package.json')
  IOService.copyFile('src/server/.babelrc', 'server/.babelrc')

  IOService.copyFile('src/server/util/BaqendResolver.js', 'server/util/BaqendResolver.js')
  IOService.copyFile('src/server/util/BaqendMutator.js', 'server/util/BaqendMutator.js')
  IOService.copyFile('src/server/util/base64.js', 'server/util/base64.js')
  IOService.copyFile('src/server/util/parseFilterInput.js', 'server/util/parseFilterInput.js')
  IOService.copyFile('src/server/util/parseSortByInput.js', 'server/util/parseSortByInput.js')

  IOService.copyFile('src/server/codegen/bundle.js', 'server/codegen/bundle.js')

  IOService.copyFile('src/server/types/types.js', 'server/schema/baqend/types.js')
  IOService.copyFile('src/server/types/resolvers.js', 'server/schema/baqend/resolvers.js')

  if(!IOService.fileExists('server/schema/custom/types.js')) {
    IOService.copyFile('src/server/custom/types.js', 'server/schema/custom/types.js')
  }
  if(!IOService.fileExists('server/schema/custom/resolvers.js')) {
    IOService.copyFile('src/server/custom/resolvers.js', 'server/schema/custom/resolvers.js')
  }

  const schemaJson = await fetch('https://proud-filet-mignon-324.app.baqend.com/v1/schema').then(res => res.text())
  // console.log(schemaJson)
  // const schemaJson2 = IOService.readFile(jsonPath)
  // console.log(schemaJson2)
  const schema = new Schema(schemaJson)
  let loader = generateLoader({}, schema.getLoaderDefs())
  let types = generateTypes({}, schema.getTypeDefs())
  let resolvers = generateResolvers({}, schema.getResolverDefs())
  IOService.writeFile('server/schema/generated/loader.js', loader)
  IOService.writeFile('server/schema/generated/typeDefs.js', types)
  IOService.writeFile('server/schema/generated/resolvers.js', resolvers)

}

start()
