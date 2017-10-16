import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import { db } from 'baqend'

import BaqendResolver from './util/BaqendResolver'
import BaqendMutator from './util/BaqendMutator'

import baqendTypeDefs from './schema/baqend/types.js'
import baqendResolvers from './schema/baqend/resolvers.js'

import buildDataloaders from './schema/generated/loader.js'
import typeDefs from './schema/generated/typeDefs.js'
import resolvers from './schema/generated/resolvers.js'

import customTypeDefs from './schema/custom/types.js'
import customResolvers from './schema/custom/resolvers.js'

const { Query: baqendQueryResolvers, Mutation: baqendMutationResolvers, ...rest } = baqendResolvers
const { Query: queryResolvers, Mutation: mutationResolvers } = resolvers
const { Query: customQueryResolvers, Mutation: customMutationResolvers } = customResolvers

const schema = makeExecutableSchema({
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

const start = async () => {

  const connection = await db.connect('proud-filet-mignon-324')
  const baqendLoader = buildDataloaders({ db: connection })
  const baqendResolver = new BaqendResolver({ db: connection, loader: baqendLoader, api: 'relay' })
  const baqendMutator = new BaqendMutator({ db: connection })

  var app = express()

  app.use('/graphql', bodyParser.json(), graphqlExpress(async (req, res) => {
    return {
      context: {
        baqendResolver,
        baqendMutator
      },
      schema
    }
  }))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
  const PORT = 8000
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  })
}

start()
