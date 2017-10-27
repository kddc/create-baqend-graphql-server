/* eslint-disable */
import { codeBlock } from 'common-tags'
import * as babel from 'babel-core'
import UglifyJS from 'uglify-es'
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
  const base64 = readFile('./src/util/base64.js')
  const helpers = readFile('./src/util/helpers.js')
  const parseFilterInput = readFile('./src/util/parseFilterInput.js')
  const parseSortByInput = readFile('./src/util/parseSortByInput.js')
  const baqendResolver = readFile('./src/BaqendResolver.js')
  const baqendMutator = readFile('./src/BaqendMutator.js')

  const loader = readFile('./src/schema/generated/loader.js')

  const baseTypeDefs = readFile('./src/schema/base/typeDefs.js')
  const baseResolvers = readFile('./src/schema/base/resolvers.js')

  const filterTypeDefs = readFile('./src/schema/filters/typeDefs.js')

  const scalarTypeDefs = readFile('./src/schema/scalars/typeDefs.js')
  const scalarResolvers = readFile('./src/schema/scalars/resolvers.js')

  const generatedTypeDefs = readFile('./src/schema/generated/typeDefs.js')
  const generatedResolvers = readFile('./src/schema/generated/resolvers.js')

  const customTypeDefs = readFile('./src/schema/custom/typeDefs.js')
  const customResolvers = readFile('./src/schema/custom/resolvers.js')

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
    presets: [['env', {
      targets: {
        node: '6',
      },
    }]],
    plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread'],
  })
  if (!fileExists('dist')) mkDir('dist')
  writeFile('dist/graphql.js', UglifyJS.minify(bundle.code).code)
  // if (!fileExists('dist')) mkDir('dist')
  // writeFile('dist/graphql.js', bundle)
}

start()
