import flatten from '../util/flatten'
import { codeBlock } from 'common-tags'

import Field from './Field'
import TypeParser from './parsers/TypeParser'

import { loaderDefinitions } from './defs/loaders/loaders'

import { objectDefinitions } from './defs/types/objects'
import { connectionDefinitions } from './defs/types/connections'
import { fieldConnectionDefinitions, fieldConnectionInputDefinitions } from './defs/types/fields'
import { filterDefinitions } from './defs/types/filters'
import { inputDefinitions, connectionInputDefinitions } from './defs/types/inputs'
import { payloadDefinitions, connectionPayloadDefinitions } from './defs/types/payloads'
import { queryDefinitions } from './defs/types/queries'
import { mutationDefinitions, connectionMutationDefinitions } from './defs/types/mutations'

import { objectResolvers } from './defs/resolvers/objects'
import { connectionResolvers } from './defs/resolvers/connections'
import { queryResolvers } from './defs/resolvers/queries'
import { mutationResolvers, connectionMutationResolvers } from './defs/resolvers/mutations'
import { payloadResolvers, connectionPayloadResolvers } from './defs/resolvers/payloads'

export default class ObjectType {
  constructor(schemaObject) {
    this.name = schemaObject['name']
    this.type = schemaObject['name']
    this.abstract = schemaObject['abstract']
    this.parent = schemaObject['parent']
    this.embedded = schemaObject['embedded']
    this.connections = schemaObject['connections']
    this.parentFields = schemaObject.parentFields
      .map(field => new Field(field))
    this.fields = schemaObject.fields
      .map(field => new Field(field))
  }

  loader(opts) {
    const name = this.name
    return !(this.embedded || this.abstract) && loaderDefinitions(opts, { name })
  }

  typeDefs(opts) {
    const parentFields = this.parentFields
      .map(field => field.defs(opts))
    const fields = this.fields
      .map(field => field.defs(opts))

    return objectDefinitions(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      parent: this.parent,
      embedded: this.embedded,
      parentFields: parentFields,
      fields: fields
    })
  }

  typeResolvers(opts) {
    const fields = this.fields
      .filter(field => !field.isScalar())
      .map(field => field.resolvers(opts))
    return objectResolvers(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      fields: fields
    })
  }

  connectionDefs(opts) {
    const fieldConnectionDefs = this.fields
      .map(field => fieldConnectionDefinitions(opts, field.props))
    const objectConnectionDefs = connectionDefinitions(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract
    })
    return [ fieldConnectionDefs, objectConnectionDefs ]
  }

  connectionResolvers(opts) {
    return connectionResolvers(opts, {
      name: this.name,
      abstract: this.abstract
    })
  }

  filterDefs(opts) {
    const name = this.name
    const type = this.type
    const fields = this.fields
    const parentFields = this.parentFields
    return !this.abstract && filterDefinitions(opts, { name, type, parentFields, fields })
  }

  queryDefs(opts) {
    const name = this.name
    const type = this.type
    return !(this.embedded || this.abstract) && queryDefinitions(opts, { name, type })
  }

  queryResolvers(opts) {
    const name = this.name
    const type = this.type
    return !(this.embedded || this.abstract) && queryResolvers(opts, { name, type })
  }

  inputDefs(opts) {
    const fieldInputDefs = this.fields
      .map(field => fieldConnectionInputDefinitions(opts, field.props))
    const objectInputDefs = !this.abstract && inputDefinitions(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      embedded: this.embedded,
      fields: flatten(this.fields.map(field => {
        return field.inputDefs(opts)
      }))
    })
    const connectionInputDefs = !(this.embedded || this.abstract) && connectionInputDefinitions(opts, {
      name: this.name,
      type: this.type,
      connections: this.connections
    })
    return [ fieldInputDefs, objectInputDefs, connectionInputDefs ]
  }

  payloadDefs(opts) {
    const objectPayloadDefs = !(this.embedded || this.abstract) && payloadDefinitions(opts, {
      name: this.name,
      type: this.type,
      parentFields: flatten(this.parentFields.map(field => {
        return field.defs(opts)
      })),
      fields: flatten(this.fields.map(field => {
        return field.defs(opts)
      }))
    })
    const connectionPayloadDefs = !(this.embedded || this.abstract) && connectionPayloadDefinitions(opts, {
      name: this.name,
      type: this.type,
      connections: this.connections,
      parentFields: flatten(this.parentFields.map(field => {
        return field.defs(opts)
      })),
      fields: flatten(this.fields.map(field => {
        return field.defs(opts)
      }))
    })
    return [ objectPayloadDefs, connectionPayloadDefs ]
  }

  payloadResolvers(opts) {
    const payloadResolverDefs = payloadResolvers(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      fields: this.fields
        .filter(field => !field.isScalar())
        .map(field => field.resolvers(opts))
    })
    const connectionPayloadResolverDefs = connectionPayloadResolvers(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      connections: this.connections,
      fields: this.fields
        .filter(field => !field.isScalar())
        .map(field => field.resolvers(opts))
    })
    return [ payloadResolverDefs, connectionPayloadResolverDefs ]
  }

  mutationDefs(opts) {
    return !(this.embedded || this.abstract) && mutationDefinitions(opts, {
      name: this.name,
      type: this.type,
    })
  }

  mutationResolvers(opts) {
    const name = this.name
    const type = this.type
    const objectMutationResolverDefs = !(this.embedded || this.abstract) && mutationResolvers(opts, { name, type })
    const connectionMutationResolversDefs = !(this.embedded || this.abstract) && connectionMutationResolvers(opts, {
      name,
      type,
      connections: this.connections
    })
    return [ objectMutationResolverDefs, connectionMutationResolversDefs ]
  }

  connectionMutationDefs(opts) {
    return !(this.embedded || this.abstract) && connectionMutationDefinitions(opts, {
      name: this.name,
      type: this.type,
      connections: this.connections
    })
  }

}
