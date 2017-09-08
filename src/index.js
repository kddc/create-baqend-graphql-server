import util from 'util'
import path from 'path'
const inputPath = path.join(process.cwd(), './src/input/schema.json')
const outputPath = path.join(process.cwd(), './src/output/schema.js')

import IOService from './services/IOService'
import CreateSchema from './schema/CreateSchema'

const getInputSchema = (path) => {
  return IOService.readFile(path).then((schema) => {
    return schema
  }, (err) => {
    throw err
  })
}

const writeGraphqlSchema = (data, path) => {
  return IOService.writeFile(data, path).then(() => {
    console.log("TypeDefinitions saved succesfully")
  }, (err) => {
    console.log("Could not save TypeDefinitions")
  })
}

const start = async () => {
  const schemaString = await getInputSchema(inputPath)
  CreateSchema.start(schemaString)
  // const schema = prepareSchema(schemaString)
  //
  // console.log("-----------------------------------------------------------------------")
  // console.log(util.inspect(schema, false, null))
  // console.log("-----------------------------------------------------------------------")
  //
  // const baqendGraphQLSchema = new BaqendGraphQLSchema(schema)
  // console.log("-----------------------------------------------------------------------")
  // console.log(util.inspect(baqendGraphQLSchema.get(), false, null))
  // console.log("-----------------------------------------------------------------------")
  //
  // const baqendGraphQLResolvers = new BaqendGraphQLResolvers(baqendGraphQLSchema)
  // console.log("-----------------------------------------------------------------------")
  // console.log(util.inspect(baqendGraphQLResolvers.get(), false, null))
  // console.log("-----------------------------------------------------------------------")
  //
  // const baqendGraphQLServerGenerator = new BaqendGraphQLServerGenerator(baqendGraphQLSchema, baqendGraphQLResolvers)
  //
  // const typeDefs = createTypeDefsFromSchema(schema)
  // writeTypeDefinitions(typeDefs, typeDefsPath)
}

start()
