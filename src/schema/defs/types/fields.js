import { codeBlock } from 'common-tags'

const ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

const relayFieldDefinitions = ({ name, fieldType, elementType }) => {
  let args = null
  let type = null
  if(fieldType == 'collection') {
    if(elementType.collectionType == 'Map') {
      const key = elementType.types[0].elementType
      const value = elementType.types[1].elementType
      type = `[${key}${value}MapEntry]`
    } else if (elementType.collectionType == 'Set'){
      const entryFieldType = elementType.types[0].fieldType
      const entryElementType = elementType.types[0].elementType
      args = entryFieldType == 'reference' ? `(filter: ${entryElementType}Filter)` : null
      type = `[${entryElementType}]`
    } else {
      const entryFieldType = elementType.types[0].fieldType
      const entryElementType = elementType.types[0].elementType
      const filterAndSortBy = entryFieldType == 'reference' && `filter: ${entryElementType}Filter, sortBy: ${entryElementType}SortBy, ` || ''
      args = `(${filterAndSortBy}${connectionArgs})`
      type = `${entryElementType}Connection`
    }
  } else {
    type = `${elementType}${elementType === 'ID' && '!' || ''}`
  }
  return codeBlock`
    ${name}${args}: ${type}
  `
}

const fieldInputDefinitions = (opts, { name, fieldType, elementType }) => {
  let inputDefinitions = []
  if (fieldType === 'collection') {
    if(elementType.collectionType == 'Map') {
      const keyType = elementType.types[0]
      const valueType = elementType.types[1]
      const keyInput = keyType.fieldType === 'scalar' ? `${keyType.elementType}`: `${keyType.elementType}Input`
      const valueInput = valueType.fieldType === 'scalar' ? `${valueType.elementType}`: `${valueType.elementType}Input`
      const inputIdDef = (keyType.fieldType === 'reference' || valueType.fieldType === 'reference') && `${name}Ids: [${keyType.elementType}${valueType.elementType}MapInputIds!]`
      const inputDef = `${name}: [${keyType.elementType}${valueType.elementType}MapInput!]`
      return [ inputIdDef, inputDef ]
    } else {
      const valueType = elementType.types[0]
      const inputIdDef = `${name}Ids: [ID!]`
      const inputDef = `${name}: [${valueType.elementType}${valueType.fieldType !== 'scalar' && `Input` || ''}!]`
      return [ inputIdDef, inputDef ]
    }
  } else if (fieldType === 'reference') {
    const inputIdDef = `${name}Id: ID`
    const inputDef = `${name}: ${elementType}Input`
    return [ inputIdDef, inputDef ]
  } else if (fieldType === 'embedded') {
    const inputDef = `${name}: ${elementType}Input`
    return [ inputDef ]
  } else {
    const inputDef = `${name}: ${elementType}`
    return [ inputDef ]
  }
}

const fieldConnectionDefinitions = (opts, { name, fieldType, elementType }) => {
  let mapEntryDef = null
  if(fieldType === 'collection' && elementType.collectionType === 'Map') {
    const key = elementType.types[0].elementType
    const value = elementType.types[1].elementType
    mapEntryDef = codeBlock`
      type ${key}${value}MapEntry {
        key: ${key}
        value: ${value}
      }
    `
  }
  return [ mapEntryDef ]
}

const fieldConnectionInputDefinitions = (opts, { name, fieldType, elementType }) => {
  let connectionInputDefinitions = []
  if(fieldType === 'collection' && elementType.collectionType === 'Map') {
    const keyType = elementType.types[0]
    const valueType = elementType.types[1]
    const keyInput = keyType.fieldType === 'scalar' ? `${keyType.elementType}`: `ID`
    const valueInput = valueType.fieldType === 'scalar' ? `${valueType.elementType}`: `${valueType.elementType}Input`
    const keyIdInput = keyType.fieldType === 'reference' ? `ID` : keyInput
    const valueIdInput = valueType.fieldType === 'reference' ? `ID` : valueInput
    connectionInputDefinitions.push(codeBlock`
      input ${keyType.elementType}${valueType.elementType}MapInput {
        key: ${keyInput}!
        value: ${valueInput}!
      }
    `)
    if (keyType.fieldType === 'reference' || valueType.fieldType === 'reference') {
      connectionInputDefinitions.push(codeBlock`
        input ${keyType.elementType}${valueType.elementType}MapInputIds {
          key: ${keyIdInput}!
          value: ${valueIdInput}!
        }
      `)
    }
  }
  return connectionInputDefinitions
}

export {
  fieldDefinitions,
  fieldInputDefinitions,
  fieldConnectionDefinitions,
  fieldConnectionInputDefinitions
}
