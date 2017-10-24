import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
// import BaqendResolver from './util/BaqendResolver'
// import BaqendMutator from './util/BaqendMutator'

import baseTypeDefs from '../../schema/defs/relay/typeDefs'
import baseResolvers from '../../schema/defs/relay/resolvers'

import filterTypeDefs from '../../schema/defs/filters/typeDefs'

import scalarTypeDefs from '../../schema/defs/scalars/typeDefs'
import scalarResolvers from '../../schema/defs/scalars/resolvers'

// import buildDataloaders from '../../../.tmp/loader'
import generatedTypeDefs from '../../../.tmp/typeDefs'
import generatedResolvers from '../../../.tmp/resolvers'

const schema = makeExecutableSchema({
  typeDefs: [
    baseTypeDefs,
    filterTypeDefs,
    scalarTypeDefs,
    generatedTypeDefs,
  ],
  resolvers: merge(
    baseResolvers,
    scalarResolvers,
    generatedResolvers,
  ),
})

export default schema
