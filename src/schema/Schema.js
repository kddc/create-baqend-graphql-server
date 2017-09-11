import { codeBlock } from 'common-tags'

import SchemaParser from './parsers/SchemaParser'
import ObjectType from './types/ObjectType'
import flatten from './utils/flatten'

export default class SchemaTypes {
  constructor(schema) {
    this.schema = SchemaParser.parseSchema(schema)
    this.types = this.schema.map((schemaClass) => {
      return new ObjectType(schemaClass)
    })
  }

  getTypeDefs() {
    let objectTypeDefs = this.getObjectTypeDefs()
    let queryTypeDefs = this.getQueryTypeDefs()
    return codeBlock`
      const types = \`
        ${objectTypeDefs}
        ${queryTypeDefs}
      \`
    `
  }

  getResolverDefs() {
    let objectTypeResolverDefs = this.getObjectResolverDefs()
    let queryTypeResolverDefs = this.getQueryTypeResolverDefs()
    return codeBlock`
      const resolvers = {
        ${objectTypeResolverDefs},
        ${queryTypeResolverDefs}
      }
    `
  }

  getObjectTypeDefs() {
    let objectTypeDefs = flatten(this.types.map((objectType) => {
      return objectType.getTypeDef()
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
      return objectType.getResolverDef()
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
