import { codeBlock } from 'common-tags'

/**
 * Generates the field sortBy input definitions
 *
 * @param opts Some options to pass to the generator like which api should be used
 * @param args Input arguments for generating the code
 * @return The field input definitions
 */
const relay = ({ name }) => {
  const definitions = []
  definitions.push(codeBlock`
    ${name}: Direction
  `)
  return definitions
}

const generateFieldSortByInputDefinitions = (opts, args) => relay(args)

export default generateFieldSortByInputDefinitions
