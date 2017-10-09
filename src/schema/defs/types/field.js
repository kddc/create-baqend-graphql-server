import { codeBlock } from 'common-tags'

const connectionArgs = [
  'first: Int',
  'after: String',
  'last: Int',
  'before: String'
].join(', ')

const fieldDefinitions = (opts, args) => {
  if(opts && opts.api === 'relay') {
    return relayFieldDefinitions(args)
  }
  return simpleFieldDefinitions(args)
}

const simpleFieldDefinitions = ({ name, type, superType }) => {
  if(superType === 'collection') {
    return codeBlock`
      ${name}(filter: ${type}Filter, sortBy: ${type}SortBy, ${connectionArgs}): [${type}]
    `
  } else {
    return codeBlock`
      ${name}: ${type}
    `
  }
}

const relayFieldDefinitions = ({ name, type, superType }) => {
  if(superType === 'collection') {
    return codeBlock`
      ${name}(filter: ${type}Filter, sortBy: ${type}SortBy, ${connectionArgs}): ${type}Connection
    `
  } else {
    return codeBlock`
      ${name}: ${type}!
    `
  }
}


export {
  fieldDefinitions
}
