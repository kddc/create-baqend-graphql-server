import { codeBlock } from 'common-tags'

const generateBundle = (opts, args) => {
  const {
    importDefinitions,
    definitions,
    graphqlDefinitionNames,
    graphqlDefinitions,
  } = args
  return codeBlock`
    import { graphql } from 'graphql'
    import { makeExecutableSchema } from 'graphql-tools'
    import { merge } from 'lodash'
    ${importDefinitions.join('\n')}
    ${definitions.join('\n')}
    ${graphqlDefinitions.join('\n')}

    const schema = makeExecutableSchema({
      typeDefs: [${graphqlDefinitionNames.typeDefs.join(',')}],
      resolvers: merge(${graphqlDefinitionNames.resolvers.join(',')}),
    })

    exports.post = function(db, req, res) {
      let data = req.body
      let query = data.query
      let baqendLoader = buildDataloaders({ db: db })
      let baqendResolver = new BaqendResolver({ db: db, loader: baqendLoader, api: 'relay' })
      let baqendMutator = new BaqendMutator({ db: db })
      let variables = data.variables
      let operationName = data.operationName
      return graphql(schema, query, null, { baqendResolver, baqendMutator }, variables, operationName).then((response) => {
        res.json(response)
      })
    }
  `
}

export {
  generateBundle,
}
