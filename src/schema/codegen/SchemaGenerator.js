import { codeBlock } from 'common-tags'

import TypeDefsGenerator from './types/TypeDefsGenerator'
import QueryTypeDefsGenerator from './types/QueryTypeDefsGenerator'

import TypeResolversGenerator from './resolvers/TypeResolversGenerator'
import QueryTypeResolversGenerator from './resolvers/QueryTypeResolversGenerator'

export default class SchemaGenerator {
  constructor() {
    this.typeDefsGenerator = new TypeDefsGenerator()
    this.queryTypeDefsGenerator = new QueryTypeDefsGenerator()

    this.typeResolversGenerator = new TypeResolversGenerator()
    this.queryTypeResolversGenerator = new QueryTypeResolversGenerator()
  }

  generateSchema(schema) {
    let typeDefs = this.generateTypeDefs(schema.types)
    let resolvers = this.generateResolvers(schema.resolvers)
    return {
      typeDefs,
      resolvers
    }
  }

  generateTypeDefs({ types, queryTypes }) {
    let typeDefsCode = this.typeDefsGenerator.generateTypeDefs(types)
    let queryTypeDefsCode = this.queryTypeDefsGenerator.generateQueryTypeDefs(queryTypes)
    return codeBlock`
    let typeDefs = \`
      ${typeDefsCode},
      ${queryTypeDefsCode}
    \``;
  }

  generateResolvers({ typeResolvers, queryTypeResolvers }) {
    let typeResolversCode = this.typeResolversGenerator.generateTypeResolvers(typeResolvers)
    let queryTypeResolversCode = this.queryTypeResolversGenerator.generateQueryTypeResolvers(queryTypeResolvers)
    return codeBlock`
    let resolvers = {
      ${typeResolversCode},
      ${queryTypeResolversCode}
    }`;
  }
}
