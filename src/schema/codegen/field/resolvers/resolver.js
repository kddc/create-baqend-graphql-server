import { codeBlock } from 'common-tags'

/**
 * Generates the field type definitions to resolve the object references
 *
 * @param opts Some options to pass to the generator like which api should be used
 * @param args Input arguments for generating the code
 * @return The field type definitions
 */
const relay = ({ name, fieldType, elementType }) => {
  let resolveMethod
  const definitions = []
  switch (fieldType) {
    case 'collection':
      switch (elementType.collectionType) {
        case 'Map': {
          const keyType = elementType.types[0]
          const valueType = elementType.types[1]
          const keyElementType = (!keyType.fieldType.match(/(scalar|embedded)/) && `'${keyType.elementType}'`) || null
          const valueElementType = (!valueType.fieldType.match(/(scalar|embedded)/) && `'${valueType.elementType}'`) || null
          resolveMethod = `return baqendResolver.resolveMap([ ${keyElementType}, ${valueElementType} ], ${name}, args)`
          break
        }
        default: {
          const { collectionType } = elementType
          const entryFieldType = elementType.types[0].fieldType
          const entryElementType = elementType.types[0].elementType
          switch (entryFieldType) {
            case 'reference':
              resolveMethod = `return baqendResolver.resolveReference${collectionType}('${entryElementType}', ${name}, args)`
              break
            default:
              resolveMethod = `return baqendResolver.resolve${collectionType}(${name}, args)`
          }
        }
      }
      break
    case 'reference':
      resolveMethod = `return baqendResolver.resolveReference('${elementType}', ${name}, args)`
      break
    default:
      resolveMethod = `return ${name}`
  }
  definitions.push(codeBlock`
    ${name}: ({ ${name} }, args, { baqendResolver }) => {
      ${resolveMethod}
    }
  `)
  return definitions
}

const generateFieldResolverDefinitions = (opts, args) => relay(args)

export default generateFieldResolverDefinitions
