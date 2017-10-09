import { codeBlock } from 'common-tags'
import flatten from '../util/flatten'

import SchemaParser from './parsers/SchemaParser'
import ObjectType from './ObjectType'

import { nodeTypes, nodeFields } from  './defs/types/relay/node'
import { connectionTypes } from  './defs/types/relay/connections'
import { filterTypes } from  './defs/types/filter'
import { loaderDefinitions } from './defs/loaders/loaders'

export default class SchemaTypes {
  constructor(schema) {
    this.opts = { api: 'relay' }
    this.schema = SchemaParser.parseSchema(schema)
    this.types = this.schema.map((schemaClass) => {
      return new ObjectType(schemaClass)
    })
  }

  getLoaderDefs() {
    const loaders = flatten(this.types.map(type => {
      return type.loader(this.opts)
    }))
    return { loaders }
  }

  getTypeDefs() {
    const typeDefs = this.types.map(type => {
      return type.typeDefs(this.opts)
    })

    const filterDefs = [
      filterTypes,
      this.types.map(type => {
        return type.filterDefs(this.opts)
      })
    ]

    const defs = flatten([
      this.opts.api === 'relay' && nodeTypes || null,
      this.opts.api === 'relay' && connectionTypes || null,
      typeDefs,
      filterDefs
    ])

    const queryDefs = flatten([
      this.opts.api === 'relay' && nodeFields || null,
      this.types.map(type => {
        return type.queryDefs(this.opts)
      })
    ])

    return { defs, queryDefs }
  }

  getResolverDefs() {
    const resolvers = flatten(this.types.map(type => {
      return type.typeResolvers(this.opts)
    }))

    const queryResolvers = flatten(this.types.map(type => {
      return type.queryResolvers(this.opts)
    }))

    return { resolvers, queryResolvers }
  }

  // getObjectTypeDefs() {
  //   let objectTypeDefs = flatten(this.types.map((objectType) => {
  //     return objectType.defs(this.opts)
  //   }))
  //   return codeBlock`
  //     ${objectTypeDefs.map(typeDef => {
  //       return typeDef
  //     }).join('\n')}
  //   `
  // }
  //
  // getQueryTypeDefs() {
  //   let queryTypeDefs = flatten(this.types.map((objectType) => {
  //     return objectType.getQueryTypeDefs().map((queryTypeDef) => {
  //       return queryTypeDef
  //     })
  //   }))
  //   return codeBlock`
  //     type Query {
  //       ${queryTypeDefs.map(queryTypeDef => {
  //         return queryTypeDef
  //       }).join('\n')}
  //     }
  //   `
  // }
  //
  // getObjectResolverDefs() {
  //   let objectResolverDefs = flatten(this.types.map((objectType) => {
  //     return objectType.resolvers(this.opts)
  //   }))
  //   return codeBlock`
  //     ${objectResolverDefs.map(resolverDef => {
  //       return resolverDef
  //     }).join(',\n')}
  //   `
  // }
  //
  // getQueryTypeResolverDefs() {
  //   let queryTypeResolverDefs = flatten(this.types.map((objectType) => {
  //     return objectType.getQueryTypeResolverDefs().map((queryTypeResolverDef) => {
  //       return queryTypeResolverDef
  //     })
  //   }))
  //   return codeBlock`
  //     Query: {
  //       ${queryTypeResolverDefs.map(queryTypeResolverDef => {
  //         return queryTypeResolverDef
  //       }).join(',\n')}
  //     }
  //   `
  // }

}
