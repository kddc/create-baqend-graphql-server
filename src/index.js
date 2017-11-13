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
    if (!IOService.fileExists(`${dest}/bundle`)) IOService.mkDir(`${dest}/bundle`)
    if (!IOService.fileExists(`${dest}/src`)) IOService.mkDir(`${dest}/src`)
    if (!IOService.fileExists(`${dest}/src/util`)) IOService.mkDir(`${dest}/src/util`)
    if (!IOService.fileExists(`${dest}/src/schema`)) IOService.mkDir(`${dest}/src/schema`)
    if (!IOService.fileExists(`${dest}/src/schema/generated`)) IOService.mkDir(`${dest}/src/schema/generated`)
    if (!IOService.fileExists(`${dest}/src/schema/base`)) IOService.mkDir(`${dest}/src/schema/base`)
    if (!IOService.fileExists(`${dest}/src/schema/scalars`)) IOService.mkDir(`${dest}/src/schema/scalars`)
    if (!IOService.fileExists(`${dest}/src/schema/filters`)) IOService.mkDir(`${dest}/src/schema/filters`)
    if (!IOService.fileExists(`${dest}/src/schema/custom`)) IOService.mkDir(`${dest}/src/schema/custom`)

    // server files
    IOService.copyFile('./src/server/index.js', `${dest}/index.js`)
    IOService.copyFile('./src/server/package.json', `${dest}/package.json`)
    IOService.copyFile('./src/server/.babelrc', `${dest}/.babelrc`)
    IOService.copyFile('./src/server/bundle/index.js', `${dest}/bundle/index.js`)
    IOService.copyFile('./src/server/bundle/util.js', `${dest}/bundle/util.js`)
    IOService.copyFile('./src/server/bundle/bundle.js', `${dest}/bundle/bundle.js`)

    IOService.copyFile('./src/server/src/BaqendResolver.js', `${dest}/src/BaqendResolver.js`)
    IOService.copyFile('./src/server/src/BaqendMutator.js', `${dest}/src/BaqendMutator.js`)
    IOService.copyFile('./src/server/src/util/base64.js', `${dest}/src/util/base64.js`)
    IOService.copyFile('./src/server/src/util/helpers.js', `${dest}/src/util/helpers.js`)
    IOService.copyFile('./src/server/src/util/parseFilterInput.js', `${dest}/src/util/parseFilterInput.js`)
    IOService.copyFile('./src/server/src/util/parseSortByInput.js', `${dest}/src/util/parseSortByInput.js`)

    // schema files
    IOService.copyFile('./src/schema/defs/relay/typeDefs.js', `${dest}/src/schema/base/typeDefs.js`)
    IOService.copyFile('./src/schema/defs/relay/resolvers.js', `${dest}/src/schema/base/resolvers.js`)

    IOService.copyFile('./src/schema/defs/scalars/typeDefs.js', `${dest}/src/schema/scalars/typeDefs.js`)
    IOService.copyFile('./src/schema/defs/scalars/resolvers.js', `${dest}/src/schema/scalars/resolvers.js`)

    IOService.copyFile('./src/schema/defs/filters/typeDefs.js', `${dest}/src/schema/filters/typeDefs.js`)

    if (!IOService.fileExists(`${dest}/src/schema/custom/typeDefs.js`)) {
      IOService.copyFile('./src/schema/defs/custom/typeDefs.js', `${dest}/src/schema/custom/typeDefs.js`)
    }
    if (!IOService.fileExists(`${dest}/src/schema/custom/resolvers.js`)) {
      IOService.copyFile('./src/schema/defs/custom/resolvers.js', `${dest}/src/schema/custom/resolvers.js`)
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
    IOService.writeFile(`${dest}/src/schema/generated/loader.js`, loader)
    IOService.writeFile(`${dest}/src/schema/generated/typeDefs.js`, types)
    IOService.writeFile(`${dest}/src/schema/generated/resolvers.js`, resolvers)
  }
  console.log('Generated your GraphQL server succesfully. Whoop Whoop!')
}

export default start
