/* eslint-disable */
import { codeBlock } from 'common-tags'
import * as babel from 'babel-core';
/* eslint-enable */

import { generateBundle } from '../../server/bundle/bundle'

import {
  flatten,
  readFile,
  processDefinitions,
} from '../../server/bundle/util'

const start = () => {
  const base64 = readFile('src/server/src/util/base64.js')
  const helpers = readFile('src/server/src/util/helpers.js')
  const parseFilterInput = readFile('src/server/src/util/parseFilterInput.js')
  const parseSortByInput = readFile('src/server/src/util/parseSortByInput.js')
  const baqendResolver = readFile('src/server/src/BaqendResolver.js')
  const baqendMutator = readFile('src/server/src/BaqendMutator.js')

  const loader = readFile('./.tmp/loader.js')

  const baseTypeDefs = readFile('src/schema/defs/relay/typeDefs.js')
  const baseResolvers = readFile('src/schema/defs/relay/resolvers.js')

  const filterTypeDefs = readFile('src/schema/defs/filters/typeDefs.js')

  const scalarTypeDefs = readFile('src/schema/defs/scalars/typeDefs.js')
  const scalarResolvers = readFile('src/schema/defs/scalars/resolvers.js')
  const generatedTypeDefs = readFile('./.tmp/typeDefs.js')
  const generatedResolvers = readFile('./.tmp/resolvers.js')

  const files = [
    base64,
    helpers,
    parseFilterInput,
    parseSortByInput,
    baqendResolver,
    baqendMutator,
    loader,
    baseTypeDefs,
    baseResolvers,
    filterTypeDefs,
    scalarTypeDefs,
    scalarResolvers,
    generatedTypeDefs,
    generatedResolvers,
  ].map(file => processDefinitions(file))

  const importDefinitions = flatten(files.map(file => file.importDefinitions))
  const definitions = flatten(files.map(file => file.definitions))
  const graphqlDefinitionNames = {
    typeDefs: [],
    resolvers: [],
  }
  const graphqlDefinitions = flatten(files.map(file => file.graphqlDefinitions))
    .map((graphqlDefinition) => {
      const definitionType = graphqlDefinition.type
      const definitionIndex = graphqlDefinitionNames[definitionType].length
      const definitionName = `${definitionType}${definitionIndex}`
      const definition = `const ${definitionName} = ${graphqlDefinition.definitions}`
      graphqlDefinitionNames[definitionType].push(definitionName)
      return definition
    })

  let bundle = generateBundle({}, {
    importDefinitions,
    definitions,
    graphqlDefinitionNames,
    graphqlDefinitions,
  })
  bundle = babel.transform(bundle, {
    presets: ['env'],
    plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread'],
  })
  return bundle.code
}

export default start()
