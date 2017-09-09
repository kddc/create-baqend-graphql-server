import { createObjectTypes, createQueryTypes } from './types'
import { createObjectTypeResolvers, createQueryTypeResolvers } from './resolvers'

export default class SchemaFactory {
  constructor() {}

  createFromSchema(json) {
    let types = this.createTypesFromSchema(json)
    let resolvers = this.createResolversFromTypes(types)
    return {
      types,
      resolvers
    }
  }

  createTypesFromSchema(json) {
    let objectTypes = createObjectTypes(json)
    let queryTypes = createQueryTypes(objectTypes)
    return {
      objectTypes,
      queryTypes
    }
  }

  createResolversFromTypes({objectTypes, queryTypes}) {
    let objectTypeResolvers = createObjectTypeResolvers(objectTypes)
    let queryTypeResolvers = createQueryTypeResolvers(queryTypes)
    return {
      objectTypeResolvers,
      queryTypeResolvers
    }
  }
}
