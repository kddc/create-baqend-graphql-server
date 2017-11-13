import { codeBlock } from 'common-tags'

/**
 * Generates the field filter input definitions
 *
 * @param opts Some options to pass to the generator like which api should be used
 * @param args Input arguments for generating the code
 * @return The field input definitions
 */
const relay = ({ name, fieldType, elementType }) => {
  const definitions = []
  if (fieldType === 'collection') {
    definitions.push(codeBlock`
      ${name}: CollectionFilter
    `)
  } else if (fieldType === 'reference') {
    definitions.push(codeBlock`
      ${name}: ObjectFilter
    `)
  } else if (fieldType === 'embedded') {
    definitions.push(codeBlock`
      ${name}: ${elementType}Filter
    `)
  } else {
    definitions.push(codeBlock`
      ${name}: ${elementType}Filter
    `)
  }
  return definitions
}

const generateFieldFilterInputDefinitions = (opts, args) => relay(args)

export default generateFieldFilterInputDefinitions
