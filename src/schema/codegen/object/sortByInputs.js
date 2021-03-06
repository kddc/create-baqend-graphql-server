import { codeBlock } from 'common-tags'

/**
 * Generates the object filter input definitions
 *
 * @param opts Some options to pass to the generator
 * @param args Input arguments for generating the code
 * @return The objects type definitions
 */
const relay = ({
  name,
  abstract,
  parentFields,
  fields,
}) => {
  const definitions = []
  if (!abstract) {
    if (parentFields && parentFields.length) {
      definitions.push(codeBlock`
        input ${name}SortBy {
          ${parentFields}
          ${fields}
        }
      `)
    } else {
      definitions.push(codeBlock`
        input ${name}SortBy {
          ${fields}
        }
      `)
    }
  }
  return definitions
}

const generateSortByInputDefinitions = (opts, args) => relay(args)

export default generateSortByInputDefinitions
