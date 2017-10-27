import { codeBlock } from 'common-tags'

const connectionArgs = [
  'first: Int',
  'after: String',
  'last: Int',
  'before: String',
].join(', ')

/**
 * Generates the field type definitions to resolve the object references
 *
 * @param opts Some options to pass to the generator like which api should be used
 * @param args Input arguments for generating the code
 * @return The field type definitions
 */
const relay = ({ name, fieldType, elementType }) => {
  const definitions = []
  if (fieldType === 'collection') {
    let definition
    const { collectionType } = elementType
    if (collectionType === 'Map') {
      const keyType = elementType.types[0].elementType
      const valueType = elementType.types[1].elementType
      definition = codeBlock`
        ${name}: [${keyType}${valueType}MapEntry]
      `
    } else if (collectionType === 'List' || collectionType === 'Set') {
      // const valueFieldType = elementType.types[0].fieldType
      const valueElementType = elementType.types[0].elementType
      if (collectionType === 'Set') {
        const args = ''
        // if (valueFieldType === 'reference') {
        //   args = `(filter: ${valueElementType}Filter)`
        // }
        definition = codeBlock`
          ${name}${args}: [${valueElementType}]
        `
      } else {
        const args = `(${connectionArgs})`
        // if (valueFieldType === 'reference') {
        //   args = `(filter: ${valueElementType}Filter, sortBy: ${valueElementType}SortBy, ${connectionArgs})`
        // } else {
        //   args = `(${connectionArgs})`
        // }
        definition = codeBlock`
          ${name}${args}: ${valueElementType}Connection
        `
      }
    }
    definitions.push(definition)
  } else {
    let definition
    if (elementType === 'ID') {
      definition = codeBlock`
        ${name}: ${elementType}!
      `
    } else {
      definition = codeBlock`
        ${name}: ${elementType}
      `
    }
    definitions.push(definition)
  }
  return definitions
}

const generateFieldTypeDefinitions = (opts, args) => relay(args)

export default generateFieldTypeDefinitions
