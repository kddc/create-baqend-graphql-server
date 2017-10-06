import { codeBlock } from 'common-tags'

import SchemaParser from './parsers/SchemaParser'
import ObjectType from './types/ObjectType'
import flatten from '../util/flatten'

export default class SchemaTypes {
  constructor(schema) {
    this.opts = { api: 'relay' }
    this.schema = SchemaParser.parseSchema(schema)
    this.types = this.schema.map((schemaClass) => {
      return new ObjectType(schemaClass)
    })
  }

  getTypeDefs() {
    // let objectTypeDefs = this.getObjectTypeDefs()
    // let queryTypeDefs = this.getQueryTypeDefs()
    // return [
    //   objectTypeDefs,
    //   queryTypeDefs
    // ]
    const typeDefs = flatten(this.types.map(type => {
      return type.typeDefs(this.opts)
    }))
    console.log(typeDefs)

    const queryDefs = flatten(this.types.map(type => {
      return type.queryDefs(this.opts)
    }))
    console.log(queryDefs)
    return []
  }

  getResolverDefs() {
    // let objectTypeResolverDefs = this.getObjectResolverDefs()
    // let queryTypeResolverDefs = this.getQueryTypeResolverDefs()
    // return [
    //   objectTypeResolverDefs,
    //   queryTypeResolverDefs
    // ]
    const typeResolvers = flatten(this.types.map(type => {
      return type.typeResolvers(this.opts)
    }))
    console.log(typeResolvers)

    const queryResolvers = flatten(this.types.map(type => {
      return type.queryResolvers(this.opts)
    }))
    console.log(queryResolvers)
    return []
  }

  getObjectTypeDefs() {
    let objectTypeDefs = flatten(this.types.map((objectType) => {
      return objectType.defs(this.opts)
    }))
    return codeBlock`
      ${objectTypeDefs.map(typeDef => {
        return typeDef
      }).join('\n')}
    `
  }

  getQueryTypeDefs() {
    let queryTypeDefs = flatten(this.types.map((objectType) => {
      return objectType.getQueryTypeDefs().map((queryTypeDef) => {
        return queryTypeDef
      })
    }))
    return codeBlock`
      type Query {
        ${queryTypeDefs.map(queryTypeDef => {
          return queryTypeDef
        }).join('\n')}
      }
    `
  }

  getObjectResolverDefs() {
    let objectResolverDefs = flatten(this.types.map((objectType) => {
      return objectType.resolvers(this.opts)
    }))
    return codeBlock`
      ${objectResolverDefs.map(resolverDef => {
        return resolverDef
      }).join(',\n')}
    `
  }

  getQueryTypeResolverDefs() {
    let queryTypeResolverDefs = flatten(this.types.map((objectType) => {
      return objectType.getQueryTypeResolverDefs().map((queryTypeResolverDef) => {
        return queryTypeResolverDef
      })
    }))
    return codeBlock`
      Query: {
        ${queryTypeResolverDefs.map(queryTypeResolverDef => {
          return queryTypeResolverDef
        }).join(',\n')}
      }
    `
  }

}
