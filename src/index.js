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

const start = async (args) => {
  const dest = args.dest || 'server'
  if(!IOService.fileExists(`${dest}`)) IOService.mkDir(`${dest}`)
  if (!args.schema) {
    if(!IOService.fileExists(`${dest}`)) IOService.mkDir(`${dest}`)
    if(!IOService.fileExists(`${dest}/util`)) IOService.mkDir(`${dest}/util`)
    if(!IOService.fileExists(`${dest}/schema`)) IOService.mkDir(`${dest}/schema`)
    if(!IOService.fileExists(`${dest}/codegen`)) IOService.mkDir(`${dest}/codegen`)
    if(!IOService.fileExists(`${dest}/schema/generated`)) IOService.mkDir(`${dest}/schema/generated`)
    if(!IOService.fileExists(`${dest}/schema/baqend`)) IOService.mkDir(`${dest}/schema/baqend`)
    if(!IOService.fileExists(`${dest}/schema/custom`)) IOService.mkDir(`${dest}/schema/custom`)

    IOService.copyFile(`src/server/index.js`, `${dest}/index.js`)
    IOService.copyFile(`src/server/bundle.js`, `${dest}/bundle.js`)
    IOService.copyFile(`src/server/package.json`, `${dest}/package.json`)
    IOService.copyFile(`src/server/.babelrc`, `${dest}/.babelrc`)

    IOService.copyFile(`src/server/util/BaqendResolver.js`, `${dest}/util/BaqendResolver.js`)
    IOService.copyFile(`src/server/util/BaqendMutator.js`, `${dest}/util/BaqendMutator.js`)
    IOService.copyFile(`src/server/util/base64.js`, `${dest}/util/base64.js`)
    IOService.copyFile(`src/server/util/parseFilterInput.js`, `${dest}/util/parseFilterInput.js`)
    IOService.copyFile(`src/server/util/parseSortByInput.js`, `${dest}/util/parseSortByInput.js`)

    IOService.copyFile(`src/server/codegen/bundle.js`, `${dest}/codegen/bundle.js`)

    IOService.copyFile(`src/server/types/types.js`, `${dest}/schema/baqend/types.js`)
    IOService.copyFile(`src/server/types/resolvers.js`, `${dest}/schema/baqend/resolvers.js`)

    if(!IOService.fileExists(`${dest}/schema/custom/types.js`)) {
      IOService.copyFile(`src/server/custom/types.js`, `${dest}/schema/custom/types.js`)
    }
    if(!IOService.fileExists(`${dest}/schema/custom/resolvers.js`)) {
      IOService.copyFile(`src/server/custom/resolvers.js`, `${dest}/schema/custom/resolvers.js`)
    }
  }

  let schemaJson
  if(args.file) {
    console.log('Loading schema...')
    schemaJson = IOService.readFile(`${args.file}`)
  } else if (args.app) {
    console.log('Fetching schema...')
    schemaJson = await fetch(`https://${args.app}.app.baqend.com/v1/schema`).then(res => res.text())
  }
  console.log('Reading schema...')
  const schema = new Schema(schemaJson)
  console.log('Generating loader...')
  let loader = generateLoader({}, schema.getLoaderDefs())
  console.log('Generating types...')
  let types = generateTypes({}, schema.getTypeDefs())
  console.log('Generating resolvers...')
  let resolvers = generateResolvers({}, schema.getResolverDefs())
  if (args.schema) {
    IOService.writeFile(`${dest}/loader.js`, loader)
    IOService.writeFile(`${dest}/typeDefs.js`, types)
    IOService.writeFile(`${dest}/resolvers.js`, resolvers)
  } else {
    IOService.writeFile(`${dest}/schema/generated/loader.js`, loader)
    IOService.writeFile(`${dest}/schema/generated/typeDefs.js`, types)
    IOService.writeFile(`${dest}/schema/generated/resolvers.js`, resolvers)
  }
  console.log('Generated your GraphQL server succesfully. Whoop Whoop!')
}

export default start
