import { codeBlock } from 'common-tags'

// ${field.name}: ${field.superType === 'collection' ? '[' + field.type + ']' : field.type}
const objectType = (field) => {
  return codeBlock`
    ${field.name}: ${field.superType === 'collection' ? '[' + field.type + ']' : field.type}
  `
}

const queryType = (type) => {
  return codeBlock`
    ${type.name}: ${type.superType === 'collection' ? '[' + type.type + ']' : type.type}
  `
}

export {
  objectType,
  queryType
}
