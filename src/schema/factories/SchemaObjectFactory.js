import { createObjectTypes, createQueryTypes } from './types'
import { createObjectTypeResolvers, createQueryTypeResolvers } from './resolvers'

export default class SchemaObjectFactory {
  constructor(schema) {
    this.objectTypes = null
    this.queryTypes = null
    this.objectTypeResolvers = null
    this.queryTypeResolvers = null
    this.init(schema)
  }

  init(schema) {
    this.createTypes(schema)
    this.createResolvers()
  }

  createTypes(schema) {
    this.objectTypes = createObjectTypes(schema)
    this.queryTypes = createQueryTypes(this.objectTypes)
    return this.getTypes()
  }

  createResolvers() {
    this.objectTypeResolvers = createObjectTypeResolvers(this.objectTypes)
    this.queryTypeResolvers = createQueryTypeResolvers(this.queryTypes)
    return this.getResolvers()
  }

  getAll() {
    return {
      types: this.getTypes(),
      resolvers: this.getResolvers()
    }
  }

  getTypes() {
    return {
      objectTypes: this.objectTypes,
      queryTypes: this.queryTypes
    }
  }

  getResolvers() {
    return {
      objectTypeResolvers: this.objectTypeResolvers,
      queryTypeResolvers: this.queryTypeResolvers
    }
  }
}
