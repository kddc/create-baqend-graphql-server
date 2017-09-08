import TypesFactory from './types/TypesFactory'
import QueryTypesFactory from './types/QueryTypesFactory'

import TypeResolversFactory from './resolvers/TypeResolversFactory'
import QueryTypeResolversFactory from './resolvers/QueryTypeResolversFactory'

export default class SchemaFactory {
  constructor() {
    this.typesFactory = new TypesFactory()
    this.queryTypesFactory = new QueryTypesFactory()

    this.typeResolversFactory = new TypeResolversFactory()
    this.queryTypeResolversFactory = new QueryTypeResolversFactory()
  }

  createFromSchema(json) {
    let types = this.createTypesFromSchema(json)
    let resolvers = this.createResolversFromTypes(types)
    return {
      types,
      resolvers
    }
  }

  createTypesFromSchema(json) {
    let types = this.typesFactory.createFromSchema(json)
    let queryTypes = this.queryTypesFactory.createFromTypes(types)
    return {
      types,
      queryTypes
    }
  }

  createResolversFromTypes({types, queryTypes}) {
    let typeResolvers = this.typeResolversFactory.createFromTypes(types)
    let queryTypeResolvers = this.queryTypeResolversFactory.createFromQueryTypes(queryTypes)
    return {
      typeResolvers,
      queryTypeResolvers
    }
  }
}
