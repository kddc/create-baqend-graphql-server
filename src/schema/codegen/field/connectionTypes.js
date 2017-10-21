import { codeBlock } from 'common-tags'

/**
 * Generates the connection type definitions for resolving map references
 *
 * @param opts Some options to pass to the generator like which api should be used
 * @param args Input arguments for generating the code
 * @return The field input definitions
 */
const relay = ({ fieldType, elementType }) => {
  const definitions = []
  if (fieldType === 'collection' && elementType.collectionType === 'Map') {
    const keyType = elementType.types[0].elementType
    const valueType = elementType.types[1].elementType
    definitions.push(codeBlock`
      type ${keyType}${valueType}MapEntry {
        key: ${keyType}
        value: ${valueType}
      }
    `)
  }
  return definitions
}

const generateFieldConnectionTypeDefinitions = (opts, args) => relay(args)

export default generateFieldConnectionTypeDefinitions
