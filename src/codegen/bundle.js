import { codeBlock } from 'common-tags'

const generateBundle = (opts, args) => {
  const { defs } = args
  return codeBlock`
    let { graphql } = require('graphql')
    let { makeExecutableSchema } = require('graphql-tools')
    let DataLoader = require('dataloader')
    ${defs.join('\n')}
    let schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })


    exports.post = function(db, req, res) {
      let data = req.body
      let query = data.query
      let baqendLoader = buildDataloaders({ db: db, DataLoader: DataLoader })
      let baqendResolver = new BaqendResolver({ db: db, loader: baqendLoader, api: 'relay' })
      let variables = data.variables
      let operationName = data.operationName
      return graphql(schema, query, null, { baqendResolver }, variables, operationName).then((response) => {
        res.json(response)
      })
    }
  `
}

export {
  generateBundle
}
