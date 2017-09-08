import util from 'util'
import SchemaReader from './readers/SchemaReader'
import SchemaFactory from './factories/SchemaFactory'
import SchemaGenerator from './codegen/SchemaGenerator'

class CreateSchema {
  constructor() {
    this.schemaReader = SchemaReader
    this.schemaFactory = new SchemaFactory()
    this.schemaGenerator = new SchemaGenerator()
  }

  start(input) {
    console.log("---------------------- Read Schema --------------------------")
    let schema = this.schemaReader.readSchema(input)
    console.log(util.inspect(schema, false, null))

    console.log("--------------------- Create Schema --------------------------")
    let types = this.schemaFactory.createFromSchema(schema)
    console.log(util.inspect(types, false, null))

    console.log("--------------------- Generate Code --------------------------")
    let code = this.schemaGenerator.generateSchema(types)
    console.log(code.typeDefs)
    console.log(code.resolvers)
  }

}

export default new CreateSchema()
