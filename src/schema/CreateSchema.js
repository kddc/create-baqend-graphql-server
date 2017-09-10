import util from 'util'
import SchemaReader from './readers/SchemaReader'
import SchemaObjectFactory from './factories/SchemaObjectFactory'
import SchemaCodeGenerator from './codegen/SchemaCodeGenerator'

class CreateSchema {
  constructor() {
    this.schemaReader = SchemaReader
  }

  start(input) {
    console.log("---------------------- Read Schema --------------------------")
    let schema = this.schemaReader.readSchema(input)
    console.log(util.inspect(schema, false, null))

    console.log("--------------------- Create Schema --------------------------")
    this.schemaObjectFactory = new SchemaObjectFactory(schema)
    let schemaObject = this.schemaObjectFactory.getAll()
    console.log(util.inspect(schemaObject, false, null))

    console.log("--------------------- Generate Code --------------------------")
    this.schemaCodeGenerator = new SchemaCodeGenerator(schemaObject)
    let code = this.schemaCodeGenerator.getAll()
    console.log(code.typeDefs)
    console.log(code.resolvers)
  }

}

export default new CreateSchema()
