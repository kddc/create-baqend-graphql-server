import { codeBlock } from 'common-tags'

const queryResolvers = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayQueryResolvers(args)
  }
  return simpleQueryResolvers(args)
}

const simpleQueryResolvers = ({ name, type }) => {
  const objectDef = codeBlock`
    ${type}: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('${type}', args, {})
    }
  `
  const connectionDef = codeBlock`
    all${type}s: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveCollectionQuery('${type}', args, {})
    }
  `
  return [ objectDef, connectionDef ]
}

const relayQueryResolvers = ({ name, type }) => {
  const objectDef = codeBlock`
    ${type}: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('${type}', args, {})
    }
  `
  const connectionDef = codeBlock`
    all${type}s: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveCollectionQuery('${type}', args, {})
    }
  `
  return [ objectDef, connectionDef ]
}

export {
  queryResolvers
}
