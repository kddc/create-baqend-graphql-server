import { codeBlock } from 'common-tags'
import * as babel from 'babel-core';
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import { generateBundle } from './codegen/bundle'

const readFile = (filename, encoding = 'utf8') => {
  return fs.readFileSync(path.join(process.cwd(), filename), encoding)
}

const writeFile = (filename, data, encoding = 'utf8') => {
  return fs.writeFileSync(path.join(process.cwd(), filename), data, { encoding })
}

const fileExists = (filename) => {
  return fs.existsSync(path.join(process.cwd(), filename))
}

const mkDir = (directory) => {
  return mkdirp.sync(path.join(process.cwd(), directory))
}

const deleteImports = (input) => {
  return input.replace(/^(import|export).*\n?/gm, '')
}

const start = async () => {
  let base64 = readFile('util/base64.js')
  let parseFilterInput = readFile('util/parseFilterInput.js')
  let parseSortByInput = readFile('util/parseSortByInput.js')
  let baqendResolver = readFile('util/BaqendResolver.js')
  let baqendMutator = readFile('util/BaqendMutator.js')

  let loader = readFile('schema/generated/loader.js')

  let baqendTypes = readFile('schema/baqend/types.js')
  let baqendResolvers = readFile('schema/baqend/resolvers.js')

  let types = readFile('schema/generated/typeDefs.js')
  let resolvers = readFile('schema/generated/resolvers.js')

  let customTypes = readFile('schema/custom/types.js')
  let customResolvers = readFile('schema/custom/resolvers.js')

  let defs = [
    base64,
    parseFilterInput,
    parseSortByInput,
    baqendResolver,
    baqendMutator,
    loader,
    baqendTypes,
    baqendResolvers,
    types,
    resolvers,
    customTypes,
    customResolvers
  ].map(def => {
    return deleteImports(def)
  })

  let bundle = generateBundle({}, { defs })
  bundle = babel.transform(bundle, {
    presets: ["env", "minify"],
    plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
  })
  if(!fileExists('dist')) mkDir('dist')
  writeFile('dist/graphql.js', bundle.code)
}

start()
