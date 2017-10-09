import { stripIndent, codeBlock } from 'common-tags'
import path from 'path'

import IOService from '../services/IOService'

export default class Bundler {
  constructor(schema) {
    this.schema = schema
  }

  async render(filename) {
    console.log(filename)
    console.log(path.join(process.cwd(), './src/util/BaqendResolver.js'))

    // let parseFilterInput = await IOService.readFile(path.join(process.cwd(), './src/util/parseFilterInput.js'))
    // let parseSortByInput = await IOService.readFile(path.join(process.cwd(), './src/util/parseSortByInput.js'))
    let baqendResolver = await IOService.readFile(path.join(process.cwd(), './src/util/BaqendResolver.js'))
    // parseFilterInput,
    // parseSortByInput,

    let imports = [
      baqendResolver
    ]

    let typeDefs = this.schema.getTypeDefs()
    let resolverDefs = this.schema.getResolverDefs()

    let content = codeBlock`
      let { graphql } = require('graphql');
      let { makeExecutableSchema } = require('graphql-tools');
      ${imports.join('\n')}
      let typeDefs = \`
        ${typeDefs.defs.join('\n')}
        type Query {
          ${typeDefs.queryDefs.join('\n')}
        }
      \`

      let resolvers = {
        ${resolverDefs.resolvers.join(',\n')},
        Query: {
          ${resolverDefs.queryResolvers.join(',\n')}
        }
      }

      let schema = makeExecutableSchema({
        typeDefs,
        resolvers
      })

      exports.post = function(db, req, res) {
        let data = req.body;
        let query = data.query;
        let baqendResolver = new BaqendResolver(db)
        let variables = data.variables;
        let operationName = data.operationName
        return graphql(schema, query, null, { baqendResolver }, variables, operationName).then((response) => {
          res.json(response)
        });
      };
    `
    console.log(baqendResolver.replace(/^(import|export).*\n/gm, ''))
    // return await IOService.writeFile(content, filename)
  }

}
