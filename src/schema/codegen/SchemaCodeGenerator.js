import { codeBlock } from 'common-tags'

import { generateObjectTypeDefs, generateQueryTypeDefs } from './types'
import { generateObjectTypeResolvers, generateQueryTypeResolvers } from './resolvers'

export default class SchemaCodeGenerator {
  constructor(schemaObject) {
    this.objectTypeDefs = null
    this.queryTypeDefs = null
    this.objectTypeResolvers = null
    this.queryTypeResolvers = null
    this.init(schemaObject)
  }

  init({ types, resolvers}) {
    this.generateTypeDefs(types)
    this.generateResolvers(resolvers)
  }

  generateTypeDefs({ objectTypes, queryTypes }) {
    this.objectTypeDefs = generateObjectTypeDefs(objectTypes)
    this.queryTypeDefs = generateQueryTypeDefs(queryTypes)
    return this.getTypeDefs()
  }

  generateResolvers({ objectTypeResolvers, queryTypeResolvers }) {
    this.objectTypeResolvers = generateObjectTypeResolvers(objectTypeResolvers)
    this.queryTypeResolvers = generateQueryTypeResolvers(queryTypeResolvers)
    return this.getResolvers()
  }

  getAll() {
    return {
      typeDefs: this.getTypeDefs(),
      resolvers: this.getResolvers()
    }
  }

  getTypeDefs() {
    return codeBlock`
    let typeDefs = \`
      ${this.objectTypeDefs}
      ${this.queryTypeDefs}
    \``;
  }

  getResolvers() {
    return codeBlock`
    let resolvers = {
      ${this.objectTypeResolvers},
      ${this.queryTypeResolvers}
    }`;
  }
}
