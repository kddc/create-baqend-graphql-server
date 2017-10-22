import flatten from '../util/flatten'

import Field from './Field'

import { loaderDefinitions } from './defs/loaders/loaders'

import generateTypeDefinitions from './codegen/object/type'
import generateConnectionTypeDefinitions from './codegen/object/connections'
import generateFilterInputDefinitions from './codegen/object/filterInputs'
import generateSortByInputDefinitions from './codegen/object/sortByInputs'
import generateQueryFieldDefinitions from './codegen/object/queryFields'
import generateInputDefinitions from './codegen/object/inputs'
import generatePayloadDefinitions from './codegen/object/payloads'
import generateMutationFieldDefinitions from './codegen/object/mutationFields'

import generateConnectionInputDefinitions from './codegen/connections/inputs'
import generateConnectionPayloadDefinitions from './codegen/connections/payloads'
import generateConnectionMutationFieldDefinitions from './codegen/connections/mutationFields'
// import { connectionDefinitions } from './defs/types/connections'
// import { fieldConnectionInputDefinitions } from './defs/types/fields'
// import { filterDefinitions } from './defs/types/filters'
// import { inputDefinitions, connectionInputDefinitions } from './defs/types/inputs'
// import { payloadDefinitions, connectionPayloadDefinitions } from './defs/types/payloads'
// import { queryDefinitions } from './defs/types/queries'
// import { mutationDefinitions, connectionMutationDefinitions } from './defs/types/mutations'

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

  /**
   * Generates the query field definitions
   *
   * ${name}(args): ${name}
   * all${name}s(args): ${name}Connection
   *
   * @param opts Some options to pass to the generator
   * @return The objects type definitions
   */
  queryDefs(opts) {
    const queryFieldDefinitions = generateQueryFieldDefinitions(opts, {
      name: this.name,
      abstract: this.abstract,
      embedded: this.embedded,
    })

    return [
      queryFieldDefinitions,
    ]
  }

  /**
   * Generates the query field definitions
   *
   * ${name}(args): ${name}
   * all${name}s(args): ${name}Connection
   *
   * @param opts Some options to pass to the generator
   * @return The objects type definitions
   */
  inputDefs(opts) {
    const fieldConnectionInputDefinitions = this.fields
      .map(field => field.connectionInputDefinitions(opts, field.props))

    const inputDefinitions = generateInputDefinitions(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      embedded: this.embedded,
      fields: flatten(this.fields.map(field => field.inputDefinitions(opts))),
    })

    const connectionInputDefinitions = generateConnectionInputDefinitions(opts, {
      name: this.name,
      type: this.type,
      abstract: this.abstract,
      embedded: this.embedded,
      connections: this.connections,
    })

    return [
      fieldConnectionInputDefinitions,
      inputDefinitions,
      connectionInputDefinitions,
    ]
  }

  /**
   * Generates the payload type definitions
   *
   * ${name}(args): ${name}
   * all${name}s(args): ${name}Connection
   *
   * @param opts Some options to pass to the generator
   * @return The objects type definitions
   */
  payloadDefs(opts) {
    const {
      name, type, abstract, embedded, connections,
    } = this
    const parentFields = flatten(this.parentFields
      .map(field => field.typeDefinitions(opts)))
    const fields = flatten(this.fields
      .map(field => field.typeDefinitions(opts)))

    const payloadDefinitions = generatePayloadDefinitions(opts, {
      name, type, abstract, embedded, parentFields, fields,
    })

    const connectionPayloadDefs = generateConnectionPayloadDefinitions(opts, {
      name, type, abstract, embedded, connections, parentFields, fields,
    })

    return [
      payloadDefinitions,
      connectionPayloadDefs,
    ]
  }

  /**
   * Generates the mutation field definitions
   *
   * ${name}(args): ${name}
   * all${name}s(args): ${name}Connection
   *
   * @param opts Some options to pass to the generator
   * @return The objects type definitions
   */
  mutationDefs(opts) {
    const {
      name, type, abstract, embedded, connections,
    } = this

    const mutationDefinitions = generateMutationFieldDefinitions(opts, {
      name, type, abstract, embedded,
    })

    const connectionMutationDefinitions = generateConnectionMutationFieldDefinitions(opts, {
      name, type, abstract, embedded, connections,
    })

    return [
      mutationDefinitions,
      connectionMutationDefinitions,
    ]
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
