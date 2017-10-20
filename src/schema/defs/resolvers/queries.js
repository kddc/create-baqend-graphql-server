import { codeBlock } from 'common-tags'

const queryResolvers = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayQueryResolvers(args)
  }
  return simpleQueryResolvers(args)
}

const simpleQueryResolvers = ({ name, type }) => {
  const objectDef = codeBlock`
    ${type}: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('${type}', id, {})
    }
  `
  const connectionDef = codeBlock`
    all${type}s: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveEntityReferenceQuery('${type}', args, {})
    }
  `
  return [ objectDef, connectionDef ]
}

const relayQueryResolvers = ({ name, type }) => {
  const objectDef = codeBlock`
    ${type}: (root, { id }, { baqendResolver }) => {
      return baqendResolver.resolveReferenceQuery('${type}', id, {})
    }
  `
  const connectionDef = codeBlock`
    all${type}s: (root, args, { baqendResolver }) => {
      return baqendResolver.resolveReferenceCollectionQuery('${type}', args, {})
    }
  `
  return [ objectDef, connectionDef ]
}

export {
  queryResolvers
}
