import { codeBlock } from 'common-tags'

import Field from './Field'
import TypeParser from '../parsers/TypeParser'

import { objectDefinitions } from '../defs/types/object'
import { queryDefinitions } from '../defs/types/query'

import { objectResolvers } from '../defs/resolvers/object'
import { queryResolvers } from '../defs/resolvers/query'


export default class ObjectType {
  constructor(schemaObject) {
    this.name = TypeParser.getType(schemaObject['class'])
    this.type = TypeParser.getType(schemaObject['class'])
    this.fields = schemaObject.fields.map((field) => new Field({
      name: field.name,
      type: field.type
    }))
  }

  typeDefs(opts) {
    const name = this.name
    const type = this.type
    const fields = this.fields
      .map(field => field.defs(opts))
    return objectDefinitions(opts, { name, type, fields })
  }

  typeResolvers(opts) {
    const name = this.name
    const type = this.type
    const fields = this.fields
      .filter(field => !field.isScalar())
      .map(field => field.resolvers(opts))
    return objectResolvers(opts, { name, type, fields })
  }

  queryDefs(opts) {
    const name = this.name
    const type = this.type
    return queryDefinitions(opts, { name, type })
  }

  queryResolvers(opts) {
    const name = this.name
    const type = this.type
    return queryResolvers(opts, { name, type })
  }

}

// objectDefs
// objectResolvers
//
// filterDefs
//
// connectionDefs
// connectionResolvers
//
// queryDefs
// queryResolvers
//
// mutationDefs
// mutationResolvers
