import util from 'util'
import path from 'path'
const inputPath = path.join(process.cwd(), './src/input/schema.json')
const outputPath = path.join(process.cwd(), './src/output/schema.js')

import IOService from './services/IOService'
import Schema from './schema/Schema'
// import CreateSchema from './schema/CreateSchema'

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
  const inputSchema = await getInputSchema(inputPath)
  const parsedSchema = new Schema(inputSchema)

  console.log(parsedSchema.getTypeDefs())
  console.log(parsedSchema.getResolverDefs())
}

start()
