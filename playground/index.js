import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import { db } from 'baqend'
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
    endpointURL: '/graphql'
  }))
  const PORT = 8000
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  })
}

start()

// var test = {
//   and : [
//     {
//       or : [
//         {
//           price : {
//             eq: 0.99,
//             lt: 0.99
//           },
//           name: {
//             eq: "bla"
//           }
//         },
//         {
//           price : {
//             eq: 1.99
//           }
//         }
//       ]
//     },
//     {
//       or : [
//         {
//           sale : {
//             eq: true
//           }
//         },
//         {
//           qty : {
//             lt : 20
//           }
//         }
//       ]
//     }
//   ]
// }
//
// // console.log(test)
// import util from 'util'
//
// const parseFilter = (filterObject, isPropertyLevel = true) => {
//   const isLogicalLevel = Object.keys(filterObject).filter(property => property.match(/(and|or)/)).length ? true : false
//   isPropertyLevel = isLogicalLevel ? false : isPropertyLevel
//   if(isLogicalLevel) {
//     Object.keys(filterObject).map(function(key) {
//       filterObject[`$${key}`] = filterObject[key].map(filterObject => parseFilter(filterObject, true));
//       delete filterObject[key]
//     })
//   } else if (isPropertyLevel) {
//     Object.keys(filterObject).map(function(key) {
//       filterObject[key] = parseFilter(filterObject[key], false)
//     })
//   } else {
//     Object.keys(filterObject).map(function(key) {
//       filterObject[`$${key}`] = filterObject[key]
//       delete filterObject[key]
//     })
//   }
//   return filterObject
// }
//
// console.log(JSON.stringify(parseFilter(test), null, 4));
