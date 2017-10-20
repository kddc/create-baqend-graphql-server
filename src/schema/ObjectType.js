import flatten from '../util/flatten'
import { codeBlock } from 'common-tags'

import Field from './Field'
import TypeParser from './parsers/TypeParser'

import { loaderDefinitions } from './defs/loaders/loaders'

import generateObjectTypeCode from '../codegen/object/type'
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

  /**
   * Generates the object load definitionsfor later batch requests
   *
   * @return The objects loader definitions
   */
  loader(opts) {
    const { name } = this
    if (!(this.embedded || this.abstract)) {
      return loaderDefinitions(opts, { name })
    }
    return null
  }

  /**
   * Generates the object type definitions to resolve the object references
   *
   * @param opts Some options to pass to the generator
   * @return The objects type definitions
   */
  typeDefinitions(opts) {
    const parentFields = this.parentFields.map(field => field.defs(opts))
    const fields = this.fields.map(field => field.defs(opts))

    return generateObjectTypeCode(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      parent: this.parent,
      embedded: this.embedded,
      parentFields,
      fields,
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

  mutationDefs(opts) {
    return !(this.embedded || this.abstract) && mutationDefinitions(opts, {
      name: this.name,
      type: this.type,
    })
  }

  connectionMutationDefs(opts) {
    return !(this.embedded || this.abstract) && connectionMutationDefinitions(opts, {
      name: this.name,
      type: this.type,
      connections: this.connections
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

  connectionResolvers(opts) {
    return connectionResolvers(opts, {
      name: this.name,
      abstract: this.abstract
    })
  }

  queryResolvers(opts) {
    const name = this.name
    const type = this.type
    return !(this.embedded || this.abstract) && queryResolvers(opts, { name, type })
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

}
