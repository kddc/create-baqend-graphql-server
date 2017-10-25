/* eslint-disable */
import { codeBlock } from 'common-tags'
import * as babel from 'babel-core';
/* eslint-enable */

import { generateBundle } from './bundle'

import {
  flatten,
  readFile,
  writeFile,
  fileExists,
  mkDir,
  processDefinitions,
} from './util'

const start = async () => {
  const base64 = readFile('helpers/base64.js')
  const parseFilterInput = readFile('helpers/parseFilterInput.js')
  const parseSortByInput = readFile('helpers/parseSortByInput.js')
  const baqendResolver = readFile('helpers/BaqendResolver.js')
  const baqendMutator = readFile('helpers/BaqendMutator.js')

  const loader = readFile('schema/generated/loader.js')

  const baseTypeDefs = readFile('./schema/base/typeDefs.js')
  const baseResolvers = readFile('./schema/base/resolvers.js')

  const filterTypeDefs = readFile('./schema/filters/typeDefs.js')

  const scalarTypeDefs = readFile('./schema/scalars/typeDefs.js')
  const scalarResolvers = readFile('./schema/scalars/resolvers.js')

  const generatedTypeDefs = readFile('./schema/generated/typeDefs.js')
  const generatedResolvers = readFile('./schema/generated/resolvers.js')

  const customTypeDefs = readFile('./schema/custom/typeDefs.js')
  const customResolvers = readFile('./schema/custom/resolvers.js')

  const files = [
    base64,
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
    customTypeDefs,
    customResolvers,
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
    presets: ['env', 'minify'],
    plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread'],
  })
  if (!fileExists('dist')) mkDir('dist')
  writeFile('dist/graphql.js', bundle.code)
  // if (!fileExists('dist')) mkDir('dist')
  // writeFile('dist/graphql.js', bundle)
}

start()
