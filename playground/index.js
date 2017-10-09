import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import { db } from 'baqend'
// import buildDataloaders from './dataloaders';
import DataLoader from 'dataloader'
import BaqendResolver from '../src/util/BaqendResolver'

import buildDataloaders from './schema/generated/loader.js'
import typeDefs from './schema/generated/typeDefs.js'
import resolvers from './schema/generated/resolvers.js'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const start = async () => {

  const connection = await db.connect('proud-filet-mignon-324')
  const baqendLoader = buildDataloaders({ db: connection, DataLoader: DataLoader })
  const baqendResolver = new BaqendResolver({ db: connection, loader: baqendLoader, api: 'relay' })

  var app = express()

  app.use('/graphql', bodyParser.json(), graphqlExpress(async (req, res) => {
    return {
      context: {
        baqendResolver
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
