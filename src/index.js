// import { codeBlock } from 'common-tags'
import fetch from 'node-fetch'
// import util from 'util'
// import path from 'path'

// const jsonPath = 'test/schema.json'
// const distPath = path.join(process.cwd(), './dist/graphql.js')

import IOService from './services/IOServiceSync'
import Schema from './schema/Schema'
import { generateLoader } from './schema/codegen/loader'
import { generateResolvers } from './schema/codegen/resolvers'
import { generateTypes } from './schema/codegen/types'
// import { generateBundle } from './codegen/bundle'

// const deleteImports = input => input.replace(/^(import|export).*\n?/gm, '')

const start = async (args) => {
  const dest = args.dest || 'server'
  if (!IOService.fileExists(`${dest}`)) IOService.mkDir(`${dest}`)
  if (!args.schema) {
    if (!IOService.fileExists(`${dest}/schema`)) IOService.mkDir(`${dest}/schema`)
    if (!IOService.fileExists(`${dest}/schema/generated`)) IOService.mkDir(`${dest}/schema/generated`)
    if (!IOService.fileExists(`${dest}/util`)) IOService.mkDir(`${dest}/util`)
    if (!IOService.fileExists(`${dest}/codegen`)) IOService.mkDir(`${dest}/codegen`)
    if (!IOService.fileExists(`${dest}/schema/base`)) IOService.mkDir(`${dest}/schema/base`)
    if (!IOService.fileExists(`${dest}/schema/scalars`)) IOService.mkDir(`${dest}/schema/scalars`)
    if (!IOService.fileExists(`${dest}/schema/filters`)) IOService.mkDir(`${dest}/schema/filters`)
    if (!IOService.fileExists(`${dest}/schema/custom`)) IOService.mkDir(`${dest}/schema/custom`)

    IOService.copyFile('src/server/index.js', `${dest}/index.js`)
    IOService.copyFile('src/server/bundle.js', `${dest}/bundle.js`)
    IOService.copyFile('src/server/package.json', `${dest}/package.json`)
    IOService.copyFile('src/server/.babelrc', `${dest}/.babelrc`)

    IOService.copyFile('src/server/util/BaqendResolver.js', `${dest}/util/BaqendResolver.js`)
    IOService.copyFile('src/server/util/BaqendMutator.js', `${dest}/util/BaqendMutator.js`)
    IOService.copyFile('src/server/util/base64.js', `${dest}/util/base64.js`)
    IOService.copyFile('src/server/util/parseFilterInput.js', `${dest}/util/parseFilterInput.js`)
    IOService.copyFile('src/server/util/parseSortByInput.js', `${dest}/util/parseSortByInput.js`)

    IOService.copyFile('src/server/codegen/bundle.js', `${dest}/codegen/bundle.js`)

    IOService.copyFile('src/schema/defs/relay/typeDefs.js', `${dest}/schema/base/typeDefs.js`)
    IOService.copyFile('src/schema/defs/relay/resolvers.js', `${dest}/schema/base/resolvers.js`)

    IOService.copyFile('src/schema/defs/scalars/typeDefs.js', `${dest}/schema/scalars/typeDefs.js`)
    IOService.copyFile('src/schema/defs/scalars/resolvers.js', `${dest}/schema/scalars/resolvers.js`)

    IOService.copyFile('src/schema/defs/filters/typeDefs.js', `${dest}/schema/filters/typeDefs.js`)

    if (!IOService.fileExists(`${dest}/schema/custom/typeDefs.js`)) {
      IOService.copyFile('src/schema/defs/custom/typeDefs.js', `${dest}/schema/custom/typeDefs.js`)
    }
    if (!IOService.fileExists(`${dest}/schema/custom/resolvers.js`)) {
      IOService.copyFile('src/schema/defs/custom/resolvers.js', `${dest}/schema/custom/resolvers.js`)
    }
  }

  let schemaJson
  if (args.file) {
    console.log('Loading schema...')
    schemaJson = IOService.readFile(`${args.file}`)
  } else if (args.app) {
    console.log('Fetching schema...')
    schemaJson = await fetch(`https://${args.app}.app.baqend.com/v1/schema`).then(res => res.text())
  }
  console.log('Reading schema...')
  const schema = new Schema(schemaJson)
  console.log('Generating loader...')
  const loader = generateLoader({}, schema.getLoaderDefs())
  console.log('Generating types...')
  const types = generateTypes({}, schema.getTypeDefs())
  console.log('Generating resolvers...')
  const resolvers = generateResolvers({}, schema.getResolverDefs())
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
