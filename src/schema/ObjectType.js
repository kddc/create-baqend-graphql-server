import flatten from '../util/flatten'

import Field from './Field'

import { loaderDefinitions } from './defs/loaders/loaders'

import generateTypeDefinitions from './codegen/object/type'
import generateConnectionTypeDefinitions from './codegen/object/connections'
import generateFilterInputDefinitions from './codegen/object/filterInputs'
import generateSortByInputDefinitions from './codegen/object/sortByInputs'
// import { connectionDefinitions } from './defs/types/connections'
import { fieldConnectionInputDefinitions } from './defs/types/fields'
// import { filterDefinitions } from './defs/types/filters'
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
    this.name = schemaObject.name
    this.type = schemaObject.name
    this.abstract = schemaObject.abstract
    this.parent = schemaObject.parent
    this.embedded = schemaObject.embedded
    this.connections = schemaObject.connections
    this.parentFields = schemaObject.parentFields
      .map(field => new Field(field))
    this.fields = schemaObject.fields
      .map(field => new Field(field))
  }

  /**
   * Generates the object load definitionsfor later batch requests
   *
   * @param opts Some options to pass to the generator
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
   * type ${name} {
   *   field: FieldType
   * }
   *
   * @param opts Some options to pass to the generator
   * @return The objects type definitions
   */
  typeDefinitions(opts) {
    const parentFields = this.parentFields
      .map(field => field.typeDefinitions(opts))
    const fields = this.fields
      .map(field => field.typeDefinitions(opts))

    const typeDefinitions = generateTypeDefinitions(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      parent: this.parent,
      embedded: this.embedded,
      parentFields,
      fields,
    })
    return [
      typeDefinitions,
    ]
  }

  /**
   * Generates the connection type definitions for list, sets, and maps
   *
   * type ${name}Connection { ... }
   * type ${name}Edge { ... }
   * type ${key}${value}MapEntry { ... }
   *
   * @param opts Some options to pass to the generator
   * @return The objects type definitions
   */
  connectionDefs(opts) {
    const fieldConnectionDefinitions = this.fields
      .map(field => field.connectionTypeDefinitions(opts))

    const connectionDefinitions = generateConnectionTypeDefinitions(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
    })
    return [
      fieldConnectionDefinitions,
      connectionDefinitions,
    ]
  }

  /**
   * Generates the filter input definitions for root and reference queries
   *
   * type ${name}Connection { ... }
   * type ${name}Edge { ... }
   * type ${key}${value}MapEntry { ... }
   *
   * @param opts Some options to pass to the generator
   * @return The objects type definitions
   */
  filterDefs(opts) {
    const { name, abstract } = this
    const filterInputDefinitions = generateFilterInputDefinitions(opts, {
      name,
      abstract,
      parentFields: this.parentFields
        .map(field => field.filterInputDefinitions(opts)),
      fields: this.fields
        .map(field => field.filterInputDefinitions(opts)),
    })
    const sortByInputDefinitions = generateSortByInputDefinitions(opts, {
      name,
      abstract,
      parentFields: this.parentFields
        .map(field => field.sortByInputDefinitions(opts)),
      fields: this.fields
        .map(field => field.sortByInputDefinitions(opts)),
    })
    return [
      filterInputDefinitions,
      sortByInputDefinitions,
    ]
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
        return field.typeDefinitions(opts)
      })),
      fields: flatten(this.fields.map(field => {
        return field.typeDefinitions(opts)
      }))
    })
    const connectionPayloadDefs = !(this.embedded || this.abstract) && connectionPayloadDefinitions(opts, {
      name: this.name,
      type: this.type,
      connections: this.connections,
      parentFields: flatten(this.parentFields.map(field => {
        return field.typeDefinitions(opts)
      })),
      fields: flatten(this.fields.map(field => {
        return field.typeDefinitions(opts)
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
