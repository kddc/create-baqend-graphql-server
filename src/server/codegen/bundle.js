import { codeBlock } from 'common-tags'

const generateBundle = (opts, args) => {
  const { defs } = args
  return codeBlock`
    let { graphql } = require('graphql')
    let { makeExecutableSchema } = require('graphql-tools')
    let { connectionFromArray } = require('graphql-relay')
    let { GraphQLScalarType } = require('graphql')
    let { Kind } = require('graphql/language')
    let DataLoader = require('dataloader')
    ${defs.join('\n')}
    let { Query: baqendQueryResolvers, Mutation: baqendMutationResolvers, ...rest } = baqendResolvers
    let { Query: queryResolvers, Mutation: mutationResolvers } = resolvers
    let { Query: customQueryResolvers, Mutation: customMutationResolvers } = customResolvers
    let schema = makeExecutableSchema({
      typeDefs: [
        baqendTypeDefs,
        typeDefs,
        customTypeDefs
      ],
      resolvers: {
        ...baqendResolvers,
        ...resolvers,
        ...customResolvers,
        Query: {
          ...baqendQueryResolvers,
          ...queryResolvers,
          ...customQueryResolvers,
        },
        Mutation: {
          ...baqendMutationResolvers,
          ...mutationResolvers,
          ...customMutationResolvers,
        }
      }
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
  generateBundle
}
