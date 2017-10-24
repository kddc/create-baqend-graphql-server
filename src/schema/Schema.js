import { codeBlock } from 'common-tags'
import flatten from '../util/flatten'

import SchemaParser from './parsers/SchemaParser'
import ObjectType from './ObjectType'

// import { nodeTypes, nodeFields } from  './defs/types/relay/node'
// import { connectionTypes } from  './defs/types/connections'
// import { filterTypes } from  './defs/types/filters'
// import { loaderDefinitions } from './defs/loaders/loaders'

export default class SchemaTypes {
  constructor(schema) {
    this.opts = { api: 'relay', log: true }
    this.schema = SchemaParser.parseSchema(schema)
    this.types = this.schema.map((schemaClass) => {
      return new ObjectType(schemaClass)
    })
    // console.log(JSON.stringify(this.schema, null, 4))
  }

  getLoaderDefs() {
    const loaders = flatten(this.types.map(type => {
      return type.loader(this.opts)
    }))
    return { loaders }
  }

  getTypeDefs() {
    const typeDefs = this.types.map(type => {
      return type.typeDefinitions(this.opts)
    })

    const connectionDefs = this.types.map(type => {
      return type.connectionDefs(this.opts)
    })

    const filterDefs = [
      // filterTypes,
      this.types.map(type => {
        return type.filterDefs(this.opts)
      })
    ]

    const inputDefs = this.types.map(type => {
      return type.inputDefs(this.opts)
    })

    const payloadDefs = this.types.map(type => {
      return type.payloadDefs(this.opts)
    })

    const defs = flatten([
      // this.opts.api === 'relay' && nodeTypes,
      // this.opts.api === 'relay' && connectionTypes,
      typeDefs,
      connectionDefs,
      filterDefs,
      inputDefs,
      payloadDefs
    ])

    const queryDefs = flatten([
      // this.opts.api === 'relay' && nodeFields,
      this.types.map(type => {
        return type.queryDefs(this.opts)
      })
    ])

    const mutationDefs = flatten([
      this.types.map(type => {
        return type.mutationDefs(this.opts)
      }),
    ])

    return { defs, queryDefs, mutationDefs }
  }

  getResolverDefs() {
    const objectResolvers = flatten(this.types.map(type => {
      return type.typeResolvers(this.opts)
    }))

    const connectionResolvers = flatten(this.types.map(type => {
      return type.connectionResolvers(this.opts)
    }))

    const payloadResolvers = flatten(this.types.map(type => {
      return type.payloadResolvers(this.opts)
    }))

    const resolvers = flatten([
      objectResolvers,
      connectionResolvers,
      payloadResolvers
    ])

    const queryResolvers = flatten(this.types.map(type => {
      return type.queryResolvers(this.opts)
    }))


    const mutationResolvers = flatten(this.types.map(type => {
      return type.mutationResolvers(this.opts)
    }))

    return { resolvers, queryResolvers, mutationResolvers }
  }

}
