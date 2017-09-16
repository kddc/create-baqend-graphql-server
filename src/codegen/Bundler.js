import { codeBlock } from 'common-tags'
import path from 'path'

import IOService from '../services/IOService'

export default class Bundler {
  constructor(schema) {
    this.schema = schema
  }

  async render(filename) {
    console.log(filename)
    console.log(path.join(process.cwd(), './src/util/BaqendResolver.js'))

    let baqendResolver = await IOService.readFile(path.join(process.cwd(), './src/util/BaqendResolver.js'))
    let typeDefs = this.schema.getTypeDefs()
    let resolverDefs = this.schema.getResolverDefs()

    let content = codeBlock`
      let { graphql } = require('graphql');
      let { makeExecutableSchema } = require('graphql-tools');
      ${baqendResolver.replace('export default ', '')}
      let typeDefs = \`
        ${typeDefs.join('\n')}
      \`
      let resolvers = {
        ${resolverDefs.join(',\n')}
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
    console.log(content)
    return await IOService.writeFile(content, filename)
  }

}
