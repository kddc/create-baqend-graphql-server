import { codeBlock } from 'common-tags'

import { generateObjectTypeDefs, generateQueryTypeDefs } from './types'
import { generateObjectTypeResolvers, generateQueryTypeResolvers } from './resolvers'

export default class SchemaGenerator {
  constructor() {}

  generateSchema(schema) {
    let typeDefs = this.generateTypeDefs(schema.types)
    let resolvers = this.generateResolvers(schema.resolvers)
    return {
      typeDefs,
      resolvers
    }
  }

  generateTypeDefs({ objectTypes, queryTypes }) {
    let objectTypeDefs = generateObjectTypeDefs(objectTypes)
    let queryTypeDefs = generateQueryTypeDefs(queryTypes)
    return codeBlock`
    let typeDefs = \`
      ${objectTypeDefs},
      ${queryTypeDefs}
    \``;
  }

  generateResolvers({ objectTypeResolvers, queryTypeResolvers }) {
    let objectTypeResolverDefs = generateObjectTypeResolvers(objectTypeResolvers)
    let queryTypeResolverDefs = generateQueryTypeResolvers(queryTypeResolvers)
    return codeBlock`
    let resolvers = {
      ${objectTypeResolverDefs},
      ${queryTypeResolverDefs}
    }`;
  }
}
