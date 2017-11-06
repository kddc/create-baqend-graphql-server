import express from 'express'
import bodyParser from 'body-parser'
// import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import graphqlHTTP from 'express-graphql'

import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'
import { db } from 'baqend'

import BaqendResolver from './src/BaqendResolver'
import BaqendMutator from './src/BaqendMutator'

import buildDataloaders from './src/schema/generated/loader'

import baseTypeDefs from './src/schema/base/typeDefs'
import baseResolvers from './src/schema/base/resolvers'

import filterTypeDefs from './src/schema/filters/typeDefs'

import scalarTypeDefs from './src/schema/scalars/typeDefs'
import scalarResolvers from './src/schema/scalars/resolvers'

import generatedTypeDefs from './src/schema/generated/typeDefs'
import generatedResolvers from './src/schema/generated/resolvers'

import customTypeDefs from './src/schema/custom/typeDefs'
import customResolvers from './src/schema/custom/resolvers'

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

const collectBaqendHeaders = (connection) => {
  /* eslint-disable */
  const headers = {
    'max-age': [],
    'surrogate-keys': []
  }
  const app = '/' + connection._connector.host.replace('.app.baqend.com', '')
  connection.send = ((send) => (...args) => {
    args[0].request.headers = { ...args[0].request.headers, 'fastly-debug': '1' }
    return send.call(connection, ...args).then((response) => {
      const maxAge = response.headers['cache-control'].split(',')[1].split('=')[1] || 0
      headers['max-age'].push(maxAge)
      if (response.headers['surrogate-key']) {
        const surrogateKeys = response.headers['surrogate-key'].replace(new RegExp(app,"g"), '').split(' ')
        surrogateKeys.forEach((surrogateKey) => {
          if (surrogateKey && headers['surrogate-keys'].indexOf(surrogateKey) === -1) {
            headers['surrogate-keys'].push(surrogateKey)
          }
        })
      }
      return response
    })
  })(connection.send)
  /* eslint-enable */
  return headers
}

const start = async () => {
  // const headers = ['bla']
  const connection = await db.connect('proud-filet-mignon-324')

  const app = express()

  app.get('/graphql', graphqlHTTP(() => ({
    schema,
    graphiql: true,
  })))

  app.post('/graphql', bodyParser.json(), (req, res) => {
    const headers = collectBaqendHeaders(connection)
    const baqendLoader = buildDataloaders({ db: connection })
    const baqendResolver = new BaqendResolver({ db: connection, loader: baqendLoader, api: 'relay' })
    const baqendMutator = new BaqendMutator({ db: connection })

    const data = req.body
    const { query, variables, operationName } = data

    return graphql(schema, query, null, { baqendResolver, baqendMutator }, variables, operationName)
      .then((response) => {
        response.extensions = headers
        const maxAge = Math.min(...headers['max-age'])
        if (maxAge === 0) {
          res.set('cache-control', 'no-cache, no-store, max-age=0')
        } else {
          res.set('cache-control', `public, max-age=${maxAge}`)
          res.set('surrogate-key', headers['surrogate-keys'].join(' '))
        }
        res.json(response)
      })
  })

  const PORT = 8000
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  })
}

start()
