import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { db } from 'baqend/realtime'
// import buildDataloaders from './dataloaders';
import BaqendResolver from '../src/util/BaqendResolver'

import typeDefs from './schema/generated/typeDefs.js'
import resolvers from './schema/generated/resolvers.js'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const start = async () => {

  const connection = await db.connect('proud-filet-mignon-324')
  const baqendResolver = new BaqendResolver(db)

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
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
  }))
  const PORT = 4000
  // app.listen(PORT, () => {
  //   console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  // })

  // Wrap the Express server
  const ws = createServer(app);
  ws.listen(PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onConnect: () => {
        // console.log(a,b,c)
        return { db }
      }
    }, {
      server: ws,
      path: '/subscriptions',
    });
  });
}

start()
