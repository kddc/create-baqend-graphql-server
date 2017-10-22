import { codeBlock } from 'common-tags'

const relay = ({ fieldType, elementType }) => {
  const definitions = []
  if (fieldType === 'collection' && elementType.collectionType === 'Map') {
    const keyType = elementType.types[0]
    const valueType = elementType.types[1]
    const keyInput = keyType.fieldType === 'scalar' ? `${keyType.elementType}` : 'ID'
    const valueInput = valueType.fieldType === 'scalar' ? `${valueType.elementType}` : `${valueType.elementType}Input`
    definitions.push(codeBlock`
      input ${keyType.elementType}${valueType.elementType}MapInput {
        key: ${keyInput}!
        value: ${valueInput}!
      }
    `)
    if (keyType.fieldType === 'reference' || valueType.fieldType === 'reference') {
      const keyIdInput = keyType.fieldType === 'reference' ? 'ID' : keyInput
      const valueIdInput = valueType.fieldType === 'reference' ? 'ID' : valueInput
      definitions.push(codeBlock`
        input ${keyType.elementType}${valueType.elementType}MapInputIds {
          key: ${keyIdInput}!
          value: ${valueIdInput}!
        }
      `)
    }
  }
  return definitions
}

const generateFieldConnectionInputDefinitions = (opts, args) => relay(args)

export default generateFieldConnectionInputDefinitions
