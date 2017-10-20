import { makeExecutableSchema } from 'graphql-tools'
// import BaqendResolver from './util/BaqendResolver'
// import BaqendMutator from './util/BaqendMutator'
import baqendTypeDefs from '../../server/types/types.js'
import baqendResolvers from '../../server/types/resolvers.js'

import buildDataloaders from '../../../.tmp/loader.js'
import typeDefs from '../../../.tmp/typeDefs.js'
import resolvers from '../../../.tmp/resolvers.js'

const {
  Query: baqendQueryResolvers,
  Mutation: baqendMutationResolvers,
  ...rest
} = baqendResolvers

const {
  Query: queryResolvers,
  Mutation: mutationResolvers
} = resolvers

const schema = makeExecutableSchema({
  typeDefs: [
    baqendTypeDefs,
    typeDefs
  ],
  resolvers: {
    ...baqendResolvers,
    ...resolvers,
    Query: {
      ...baqendQueryResolvers,
      ...queryResolvers,
    },
    Mutation: {
      ...baqendMutationResolvers,
      ...mutationResolvers,
    }
  }
})

export default schema
