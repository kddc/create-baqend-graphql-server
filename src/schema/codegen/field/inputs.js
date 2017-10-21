import { codeBlock } from 'common-tags'

/**
 * Generates the field input definitions to resolve the object references
 *
 * @param opts Some options to pass to the generator like which api should be used
 * @param args Input arguments for generating the code
 * @return The field input definitions
 */
const relay = ({ name, fieldType, elementType }) => {
  const definitions = []
  if (fieldType === 'collection') {
    const { collectionType } = elementType
    if (collectionType === 'Map') {
      const keyType = elementType.types[0]
      const valueType = elementType.types[1]
      if (keyType.fieldType === 'reference' || valueType.fieldType === 'reference') {
        definitions.push(codeBlock`
          ${name}Ids: [${keyType.elementType}${valueType.elementType}MapInputIds!]
        `)
      }
      definitions.push(codeBlock`
        ${name}: [${keyType.elementType}${valueType.elementType}MapInput!]
      `)
    } else {
      const valueType = elementType.types[0]
      if (valueType.fieldType === 'reference') {
        definitions.push(codeBlock`
          ${name}Ids: [ID!]
        `)
      }
      definitions.push(codeBlock`
        ${name}: [${valueType.elementType}${(valueType.fieldType !== 'scalar' && 'Input') || ''}!]
      `)
    }
  } else if (fieldType === 'reference') {
    definitions.push(codeBlock`
      ${name}Id: ID
    `)
    definitions.push(codeBlock`
      ${name}: ${elementType}Input
    `)
  } else if (fieldType === 'embedded') {
    definitions.push(codeBlock`
      ${name}: ${elementType}Input
    `)
  } else {
    definitions.push(codeBlock`
      ${name}: ${elementType}
    `)
  }
  return definitions
}

const generateFieldInputDefinitions = (opts, args) => relay(args)

export default generateFieldInputDefinitions
