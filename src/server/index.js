import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'
import { db } from 'baqend'

import BaqendResolver from './util/BaqendResolver'
import BaqendMutator from './util/BaqendMutator'

import buildDataloaders from './schema/generated/loader'

import baseTypeDefs from './schema/base/typeDefs'
import baseResolvers from './schema/base/resolvers'

import filterTypeDefs from './schema/filters/typeDefs'

import scalarTypeDefs from './schema/scalars/typeDefs'
import scalarResolvers from './schema/scalars/resolvers'

import generatedTypeDefs from './schema/generated/typeDefs'
import generatedResolvers from './schema/generated/resolvers'

import customTypeDefs from './schema/custom/typeDefs'
import customResolvers from './schema/custom/resolvers'

const schema = makeExecutableSchema({
  typeDefs: [
    baseTypeDefs,
    filterTypeDefs,
    scalarTypeDefs,
    generatedTypeDefs,
    customTypeDefs,
  ],
  resolvers: merge(
    baseResolvers,
    scalarResolvers,
    generatedResolvers,
    customResolvers,
  ),
})

const start = async () => {
  const connection = await db.connect('proud-filet-mignon-324')
  const baqendLoader = buildDataloaders({ db: connection })
  const baqendResolver = new BaqendResolver({ db: connection, loader: baqendLoader, api: 'relay' })
  const baqendMutator = new BaqendMutator({ db: connection })

  const app = express()

  app.use('/graphql', bodyParser.json(), graphqlExpress(async (req, res) => ({
    context: {
      baqendResolver,
      baqendMutator,
    },
    schema,
  })))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }))
  const PORT = 8000
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  })
}

start()
