import { codeBlock } from 'common-tags'

const objectQueryArgs = [
  'id: ID'
].join(', ')

const connectionQueryArgs = [
  'first: Int',
  'after: String',
  'last: Int',
  'before: String'
].join(', ')

const queryDefinitions = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayQueryDefinitions(args)
  }
  return simpleQueryDefinitions(args)
}

const simpleQueryDefinitions = ({ name, type }) => {
  const objectDef = codeBlock`
    ${type}(${objectQueryArgs}): ${type}
  `
  const connectionDef = codeBlock`
    all${type}s(filter: ${type}Filter, sortBy: ${type}SortBy, ${connectionQueryArgs}): [${type}]
  `
  return [ objectDef, connectionDef ]
}

const relayQueryDefinitions = ({ name, type }) => {
  const objectDef = codeBlock`
    ${type}(${objectQueryArgs}): ${type}
  `
  const connectionDef = codeBlock`
    all${type}s(filter: ${type}Filter, sortBy: ${type}SortBy, ${connectionQueryArgs}): ${type}Connection
  `
  return [ objectDef, connectionDef ]
}

export {
  queryDefinitions
}
