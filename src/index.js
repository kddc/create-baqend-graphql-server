import { codeBlock } from 'common-tags'
import util from 'util'
import path from 'path'

const jsonPath = path.join(process.cwd(), './test/schema.json')
const typeDefsPath = path.join(process.cwd(), './playground/schema/generated/typeDefs.js')
const resolversPath = path.join(process.cwd(), './playground/schema/generated/resolvers.js')

import IOService from './services/IOService'
import Schema from './schema/Schema'
import Bundler from './codegen/Bundler'

const start = async () => {
  let json = await IOService.readFile(jsonPath)
  let schema = new Schema(json)

  let typeDefs = schema.getTypeDefs()
  let resolverDefs = schema.getResolverDefs()

  typeDefs = codeBlock`
    let typeDefs = \`
      ${typeDefs.join('\n')}
    \`
    export default typeDefs
  `

  resolverDefs = codeBlock`
    let resolvers = {
      ${resolverDefs.join(',\n')}
    }
    export default resolvers
  `

  // IOService.writeFile(typeDefs, typeDefsPath)
  // IOService.writeFile(resolverDefs, resolversPath)
  console.log(typeDefs)
  console.log(resolverDefs)
}

// const start = async () => {
//   const json = await getInputSchema(jsonPath)
//   const schema = new Schema(json)
//   const bundler = new Bundler(schema)
//   console.log(parsedSchema.getTypeDefs())
//   console.log(parsedSchema.getResolverDefs())
// }


start()
