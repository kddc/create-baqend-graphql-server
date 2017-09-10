import util from 'util'
import SchemaReader from './readers/SchemaReader'
import SchemaObjectFactory from './factories/SchemaObjectFactory'
import SchemaGenerator from './codegen/SchemaGenerator'

import applyTemplate from './templates/applyTemplate'

class CreateSchema {
  constructor() {
    this.schemaReader = SchemaReader
    this.schemaGenerator = new SchemaGenerator()
  }

  start(input) {
    // let test = [ 'resolveObjectTypeReference', [ '{ author }', 'args', 'context' ], [ '\'User\'', 'author', 'args', 'context' ] ]
    // let template = applyTemplate(...test)
    // console.log(template)
    console.log("---------------------- Read Schema --------------------------")
    let schema = this.schemaReader.readSchema(input)
    console.log(util.inspect(schema, false, null))

    console.log("--------------------- Create Schema --------------------------")
    this.schemaObjectFactory = new SchemaObjectFactory(schema)
    let schemaObject = this.schemaObjectFactory.get()
    console.log(util.inspect(schemaObject, false, null))

    console.log("--------------------- Generate Code --------------------------")
    let code = this.schemaGenerator.generateSchema(schemaObject)
    console.log(code.typeDefs)
    console.log(code.resolvers)
  }

}

export default new CreateSchema()
